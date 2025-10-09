import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.74.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { secret, context, initialMessage } = await req.json();

    // Optional: Validate secret token for security
    // const expectedSecret = Deno.env.get('CHAT_TRIGGER_SECRET');
    // if (secret !== expectedSecret) {
    //   return new Response(JSON.stringify({ error: 'Invalid secret' }), {
    //     status: 401,
    //     headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    //   });
    // }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Broadcast the chat trigger event via Realtime
    const channel = supabase.channel('chat-triggers');
    
    await channel.send({
      type: 'broadcast',
      event: 'open-chat',
      payload: {
        context,
        initialMessage: initialMessage || null,
        timestamp: new Date().toISOString(),
      },
    });

    console.log('Chat trigger event sent:', { context, initialMessage });

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Chat trigger sent successfully' 
      }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error in trigger-chat function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
