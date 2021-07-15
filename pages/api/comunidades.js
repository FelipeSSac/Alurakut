import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(request, response) {

  if(request.method === 'POST'){

    const token = '2362fa22a4e73261636a9a26c63894';
    const client = new SiteClient(token);

    const record = await client.items.create({
      itemType: '971841',
      ...request.body
    })

    return response.json(record);

  }

  return response.json({ message: 'Olá'})

}