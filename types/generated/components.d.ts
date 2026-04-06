import type { Schema, Struct } from '@strapi/strapi';

export interface ComponentArticulos extends Struct.ComponentSchema {
  collectionName: 'components_component_articulos';
  info: {
    displayName: 'Articulos';
    icon: 'bulletList';
  };
  attributes: {
    button: Schema.Attribute.Component<'component.link', false>;
    products: Schema.Attribute.Component<'component.product-card', true>;
    title: Schema.Attribute.String;
  };
}

export interface ComponentLink extends Struct.ComponentSchema {
  collectionName: 'components_component_links';
  info: {
    displayName: 'Button';
    icon: 'apps';
  };
  attributes: {
    href: Schema.Attribute.String &
      Schema.Attribute.Required &
      Schema.Attribute.DefaultTo<'#'>;
    isExternal: Schema.Attribute.Boolean;
    label: Schema.Attribute.String;
  };
}

export interface ComponentOffers extends Struct.ComponentSchema {
  collectionName: 'components_component_offers';
  info: {
    displayName: 'Offers';
    icon: 'exit';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    linkOffer: Schema.Attribute.Component<'component.link', false>;
    subtitle: Schema.Attribute.String;
    textoButton: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface ComponentProductCard extends Struct.ComponentSchema {
  collectionName: 'components_component_product_cards';
  info: {
    displayName: 'Product-card';
    icon: 'apps';
  };
  attributes: {
    Link: Schema.Attribute.Text;
    media: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String;
    price: Schema.Attribute.Decimal;
  };
}

export interface ComponentSports extends Struct.ComponentSchema {
  collectionName: 'components_component_sports';
  info: {
    displayName: 'Sports';
    icon: 'apps';
  };
  attributes: {
    title: Schema.Attribute.String;
    types: Schema.Attribute.Component<'component.types', true>;
  };
}

export interface ComponentTypes extends Struct.ComponentSchema {
  collectionName: 'components_component_types';
  info: {
    displayName: 'Types';
    icon: 'apps';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    label: Schema.Attribute.String;
    link: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'component.articulos': ComponentArticulos;
      'component.link': ComponentLink;
      'component.offers': ComponentOffers;
      'component.product-card': ComponentProductCard;
      'component.sports': ComponentSports;
      'component.types': ComponentTypes;
    }
  }
}
