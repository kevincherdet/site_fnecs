import type { Schema, Struct } from '@strapi/strapi';

export interface StructureBureauMembre extends Struct.ComponentSchema {
  collectionName: 'components_structure_bureau_membres';
  info: {
    description: 'Associe un membre \u00E0 une fonction dans une structure';
    displayName: 'Bureau Membre';
    icon: 'user';
  };
  attributes: {
    fonction: Schema.Attribute.String & Schema.Attribute.Required;
    membre: Schema.Attribute.Relation<'manyToOne', 'api::membre.membre'>;
  };
}

export interface StructureConventionCollective extends Struct.ComponentSchema {
  collectionName: 'components_structure_conventions_collectives';
  info: {
    description: 'Convention collective repr\u00E9sent\u00E9e par une USN';
    displayName: 'Convention Collective';
    icon: 'file';
  };
  attributes: {
    idcc: Schema.Attribute.String;
    nom: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'structure.bureau-membre': StructureBureauMembre;
      'structure.convention-collective': StructureConventionCollective;
    }
  }
}
