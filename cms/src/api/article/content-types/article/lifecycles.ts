import type { Event } from '@strapi/database/dist/lifecycles';

async function validateSecteurIsUSN(event: Event) {
  const { data } = event.params;
  if (!data?.secteur?.connect?.length) return;

  const secteurId = data.secteur.connect[0].id;
  const structure = await strapi.documents('api::structure.structure').findOne({
    documentId: secteurId,
    fields: ['type'],
  });

  if (structure && structure.type !== 'usn') {
    throw new Error('Le secteur doit être une USN, pas une fédération ou un syndicat.');
  }
}

export default {
  beforeCreate: validateSecteurIsUSN,
  beforeUpdate: validateSecteurIsUSN,
};
