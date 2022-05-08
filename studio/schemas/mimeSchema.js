export const mimeSchema = {
    name: 'mimes',
    type: 'document',
    title: 'Mimes',
    fields: [
      {
        name: 'mimeTitle',
        type: 'string',
        title: 'Mime Title',
      },

      {
        name: 'mimeDesc',
        type: 'string',
        title: 'Mime Desc',
      },
      {
        name: 'mimeImage',
        type: 'string',
        title: 'Mime Image',
      },
      {
        name: 'walletAddress',
        type: 'string',
        title: 'Wallet Address',
      },
      {
        name: 'timestamp',
        type: 'datetime',
        title: 'Timestamp',
      },
      {
        name: 'author',
        title: 'Author',
        type: 'reference',
        to: [{ type: 'users' }],
      },
    ],
  }  