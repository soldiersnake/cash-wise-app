export async function obtenerChatRespuesta(consultaAlChat) {
  // const api_key = process.env.REACT_APP_OpenAIApiKey;

  // const api_key = process.env.REACT_APP_API_KEY; //AQUI VA LA API_KEY
  const api_key = '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'
  
  console.log(api_key);

  const url = "https://api.openai.com/v1/chat/completions";
  
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${api_key}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "Cumplis el rol de un asesor financiero, por lo tanto debes de responder a preguntas relacionadas a economia, financiamiento, ahorro e inversiones, debes ser coordial y simple, que las respuestas no sean demasiado extensas., si te preguntan algo que no se relaciona a los temas anteriores, decir que no te corresponde dar respuesta a la pregunta debido a que no estas programada para tal."
          },
          { role: "user", content: consultaAlChat },
        ],
        temperature: 0.7,
        max_tokens: 50, // Ajusta este número según las necesidades de tu aplicación
      }),
    });

    const data = await res.json();
    console.log(data);
    // return data;
    // Acceder al contenido del mensaje
    if (data.choices && data.choices.length > 0 && data.choices[0].message) {
      const messageContent = data.choices[0].message.content;
      console.log(messageContent);
      return messageContent; 
    } else {
      console.log("No se encontró el mensaje en la respuesta.");
    }
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
}
