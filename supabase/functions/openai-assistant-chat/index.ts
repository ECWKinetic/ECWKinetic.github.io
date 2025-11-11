import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import "https://deno.land/x/xhr@0.1.0/mod.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const OPENAI_API_KEY = Deno.env.get('OPENAI_API_KEY');
const ASSISTANT_ID = 'asst_GvoIu1KSLelzuajXVLqFwuZz';
const N8N_WEBHOOK_URL = 'https://kineticconsulting.app.n8n.cloud/webhook-test/assistant-completion';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

interface FormData {
  name: string;
  email: string;
  type: 'candidate' | 'projectlead';
  sessionId: string;
  companyName?: string;
  phone?: string;
}

interface RequestBody {
  action: 'start' | 'message' | 'close' | 'timeout';
  threadId?: string;
  message?: string;
  formData: FormData;
  messageCount?: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY is not configured');
    }

    const body: RequestBody = await req.json();
    const { action, threadId, message, formData, messageCount = 0 } = body;

    console.log('OpenAI Assistant Chat - Action:', action, 'ThreadID:', threadId);

    // Handle completion triggers (close or timeout)
    if (action === 'close' || action === 'timeout') {
      await sendToN8N({
        sessionId: formData.sessionId,
        formData,
        conversationData: {
          qualification_status: 'needs_follow_up',
          conversation_summary: `Conversation ended by ${action === 'close' ? 'user closing chat' : 'inactivity timeout'}`,
          key_insights: [],
          next_steps: 'Follow up with user',
          additional_data: {}
        },
        completionReason: action === 'close' ? 'user_closed' : 'timeout',
        threadId: threadId || 'no_thread',
        timestamp: new Date().toISOString(),
        messageCount
      });

      return new Response(
        JSON.stringify({ 
          success: true, 
          message: 'Conversation data sent to n8n' 
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Create new thread or use existing
    let currentThreadId = threadId;
    if (!currentThreadId) {
      const threadResponse = await fetch('https://api.openai.com/v1/threads', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
          'OpenAI-Beta': 'assistants=v2',
        },
      });

      if (!threadResponse.ok) {
        const error = await threadResponse.text();
        console.error('Failed to create thread:', error);
        throw new Error('Failed to create conversation thread');
      }

      const thread = await threadResponse.json();
      currentThreadId = thread.id;
      console.log('Created new thread:', currentThreadId);
    }

    // Add user message to thread
    if (message) {
      const addMessageResponse = await fetch(
        `https://api.openai.com/v1/threads/${currentThreadId}/messages`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
            'OpenAI-Beta': 'assistants=v2',
          },
          body: JSON.stringify({
            role: 'user',
            content: message,
          }),
        }
      );

      if (!addMessageResponse.ok) {
        const error = await addMessageResponse.text();
        console.error('Failed to add message:', error);
        throw new Error('Failed to send message');
      }

      console.log('Added user message to thread');
    }

    // Run the assistant
    const runResponse = await fetch(
      `https://api.openai.com/v1/threads/${currentThreadId}/runs`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
          'OpenAI-Beta': 'assistants=v2',
        },
        body: JSON.stringify({
          assistant_id: ASSISTANT_ID,
        }),
      }
    );

    if (!runResponse.ok) {
      const error = await runResponse.text();
      console.error('Failed to run assistant:', error);
      throw new Error('Failed to run assistant');
    }

    const run = await runResponse.json();
    console.log('Started run:', run.id);

    // Poll for completion
    let runStatus = run.status;
    let runData = run;
    const maxAttempts = 60; // 60 seconds max
    let attempts = 0;

    while (
      runStatus === 'queued' || 
      runStatus === 'in_progress' ||
      runStatus === 'cancelling'
    ) {
      if (attempts >= maxAttempts) {
        throw new Error('Assistant response timeout');
      }

      await new Promise(resolve => setTimeout(resolve, 1000));
      attempts++;

      const statusResponse = await fetch(
        `https://api.openai.com/v1/threads/${currentThreadId}/runs/${run.id}`,
        {
          headers: {
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
            'OpenAI-Beta': 'assistants=v2',
          },
        }
      );

      runData = await statusResponse.json();
      runStatus = runData.status;
      console.log('Run status:', runStatus);
    }

    // Handle function calls
    if (runStatus === 'requires_action' && runData.required_action?.type === 'submit_tool_outputs') {
      const toolCalls = runData.required_action.submit_tool_outputs.tool_calls;
      
      for (const toolCall of toolCalls) {
        if (toolCall.function.name === 'submit_conversation_data') {
          const functionArgs = JSON.parse(toolCall.function.arguments);
          console.log('Assistant called submit_conversation_data:', functionArgs);

          // Send to n8n
          await sendToN8N({
            sessionId: formData.sessionId,
            formData,
            conversationData: functionArgs,
            completionReason: 'function_call',
            threadId: currentThreadId,
            timestamp: new Date().toISOString(),
            messageCount: messageCount + 1
          });

          // Submit tool output to complete the run
          await fetch(
            `https://api.openai.com/v1/threads/${currentThreadId}/runs/${run.id}/submit_tool_outputs`,
            {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
                'OpenAI-Beta': 'assistants=v2',
              },
              body: JSON.stringify({
                tool_outputs: [{
                  tool_call_id: toolCall.id,
                  output: 'Data submitted successfully. Thank you for the conversation!'
                }]
              }),
            }
          );

          return new Response(
            JSON.stringify({ 
              threadId: currentThreadId,
              completed: true,
              message: 'Thank you! Your information has been submitted. Someone will be in touch soon.'
            }),
            {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          );
        }
      }
    }

    // Get the assistant's response
    const messagesResponse = await fetch(
      `https://api.openai.com/v1/threads/${currentThreadId}/messages?order=desc&limit=1`,
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'OpenAI-Beta': 'assistants=v2',
        },
      }
    );

    const messagesData = await messagesResponse.json();
    const assistantMessage = messagesData.data[0];
    const responseText = assistantMessage.content[0].text.value;

    return new Response(
      JSON.stringify({ 
        threadId: currentThreadId,
        message: responseText,
        completed: false
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('Error in openai-assistant-chat function:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to process chat request. Please try again.' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

async function sendToN8N(data: any) {
  try {
    console.log('Sending data to n8n:', data);
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error('n8n webhook failed:', await response.text());
    } else {
      console.log('Successfully sent data to n8n');
    }
  } catch (error) {
    console.error('Error sending to n8n:', error);
  }
}
