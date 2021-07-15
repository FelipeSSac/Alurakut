import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {

  if(request.method === 'POST'){

    const token = process.env.NEXT_FULL_ACCESS_TOKEN;
    const client = new SiteClient(token);

    const record = await client.items.create({
      itemType: '971841',
      ...request.body
    })

    return response.json(record);

  }

  return response.json({ message: 'Olá'})

}