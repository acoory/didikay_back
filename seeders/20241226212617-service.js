'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * */
      await queryInterface.bulkInsert('services', [{
        name: 'Twist',
        description: 'Le prix de votre prestation peut varier en fonction de la longueur et de la masse capillaire. Un ajustement pourra être appliqué après évaluation en salon.',
        price: 70,
        duration_minutes: 120,
        subprestation_id: 1,
      },
        {
            name: 'Instantané',
            description: 'Le prix de votre prestation peut varier en fonction de la longueur et de la masse capillaire. Un ajustement pourra être appliqué après évaluation en salon.',
            price: 250,
            duration_minutes: 240,
            subprestation_id: 1,
        },
        {
          name: 'Vanille',
          description: 'Le prix de votre prestation peut varier en fonction de la longueur et de la masse capillaire. Un ajustement pourra être appliqué après évaluation en salon.',
          price: 70,
          duration_minutes: 120,
          subprestation_id: 1,
        },
          {
              name: 'Micro locks',
              description: 'Le prix de votre prestation peut varier en fonction de la longueur et de la masse capillaire. Un ajustement pourra être appliqué après évaluation en salon.',
              price: 450,
              duration_minutes: 600,
              subprestation_id: 1,
          },
          // Prestation : reprise racine
          {
              name: 'Twist',
              description: 'Redéfinis tes repousses en douceur avec la reprise de racines en twist. Une technique sans tension pour des locks nettes et soignées.',
              price: 50,
              duration_minutes: 120,
              subprestation_id: 2,
          },
          {
              name: 'Crochet',
              description: 'La reprise de racines au crochet offre un resserrage durable, pour des locks nettes qui tiennent plus longtemps.',
              price: 80,
              duration_minutes: 180,
              subprestation_id: 2,
          },
          {
              name: 'Crochet Piqué',
              description: 'Reprise des racines au crochet piqué : resserre les repousses pour des locks nettes et durables, sans produit.',
              price: 120,
              duration_minutes: 240,
              subprestation_id: 2,
          },
          {
              name: 'Reprise racine micro locks',
              description: 'Reprise des racines au crochet piqué : resserre les repousses pour des locks nettes et durables, sans produit.',
              price: 240,
              duration_minutes: 180,
              subprestation_id: 2,
          },

          // Prestation : coiffure
          {
              name: 'Pas de coiffure',
              description: '',
              price: 0,
              duration_minutes: 0,
              subprestation_id: 3,
          },
          {
              name: 'Vanille/Tresse',
              description: '',
              price: 30,
              duration_minutes: 30,
              subprestation_id: 3,
          },
            {
                name: 'Barrel',
                description: '',
                price: 20,
                duration_minutes: 20,
                subprestation_id: 3,
            },
            {
                name: 'Knot Bob',
                description: '',
                price: 50,
                duration_minutes: 45,
                subprestation_id: 3,
            },
          {
                name: 'Pétale',
                description: '',
                price: 30,
                duration_minutes: 30,
                subprestation_id: 3,
          },
          // Formules coupe : cheveux courts
          {
              name: 'Coupe + Shampoing + Brushing',
              description: 'Pour une coupe nette et un brushing léger.',
              price: 40,
              duration_minutes: 45,
              subprestation_id: 4,
          },
          {
              name: 'Coupe + Shampoing + Séchage Naturel',
              description: 'Pour un look naturel avec une coupe fraîche.',
              price: 30,
              duration_minutes: 30,
              subprestation_id: 4,
          },
          {
              name: 'Coupe mixte',
              description: 'Pour une coupe nette.',
              price: 20,
              duration_minutes: 30,
              subprestation_id: 4,
          },
          {
              name: 'Coupe Transformation + Shampoing + Brushing',
              description: 'Pour une coupe transformation et un brushing léger.',
              price: 50,
              duration_minutes: 60,
              subprestation_id: 4,
          },
          {
              name: 'Coupe Transformation + Shampoing + Séchage Naturel',
              description: 'Pour une coupe transformation et un séchage naturel.',
              price: 45,
              duration_minutes: 45,
              subprestation_id: 4,
          },
          {
              name: 'Coupe + Shampoing + Soin + Séchage naturel',
              description: 'Pour une coupe nette et un soin capillaire.',
              price: 40,
              duration_minutes: 40,
              subprestation_id: 4,
          },
          // Formules coupe : cheveux mi-longs
          {
              name: 'Coupe + Shampoing + Brushing',
              description: 'Pour une coupe nette et un brushing léger.',
              price: 45,
              duration_minutes: 60,
              subprestation_id: 5,
          },
          {
              name: 'Coupe + Shampoing + Séchage Naturel',
              description: 'Pour un look naturel avec une coupe fraîche.',
              price: 40,
              duration_minutes: 60,
              subprestation_id: 5,
          },
          {
              name: 'Coupe + Shampoing + Transformation + Brushing',
              description: 'Pour une coupe radicale et un brushing qui met en valeur le nouveau look.',
              price: 52,
              duration_minutes: 60,
              subprestation_id: 5,
          },
          {
              name: 'Coupe + Shampoing + Transformation + Séchage Naturel',
              description: 'Une coupe qui change tout, avec un séchage naturel pour un effet frais et léger.',
              price: 47,
              duration_minutes: 60,
              subprestation_id: 5,
          },
          {
              name: 'Bar à Coupe – Coupe express sur cheveux secs',
              description: 'Sans shampoing, sans séchage\n' +
                  'Une coupe rapide sur cheveux propres et secs, uniquement pour entretenir votre coupe. Pas de transformation, juste un rafraîchissement !',
              price: 30,
              duration_minutes: 30,
              subprestation_id: 5,
          },
          // Formules coupe : cheveux longs
          {
              name: 'Coupe + Shampoing + Brushing',
              description: 'Pour une coupe nette et un brushing léger.',
              price: 50,
              duration_minutes: 90,
              subprestation_id: 6,
          },
          {
              name: 'Coupe + Shampoing + Séchage Naturel',
              description: 'Parfait pour nourrir et couper tout en gardant un style naturel.',
              price: 40,
              duration_minutes: 60,
              subprestation_id: 6,
          },
          {
              name: 'Coupe Transformation + Shampoing + Brushing',
              description: 'Pour une coupe qui marque un changement complet avec un brushing stylisé.',
              price: 57,
              duration_minutes: 90,
              subprestation_id: 6,
          },
          {
              name: 'Coupe Transformation + Shampoing + Séchage Naturel',
              description: 'Pour une coupe qui marque un changement complet avec un brushing stylisé.',
              price: 47,
              duration_minutes: 60,
              subprestation_id: 6,
          },
          {
              name: 'Bar à Coupe – Coupe express sur cheveux secs',
              description: 'Sans shampoing, sans séchage\n' +
                  'Une coupe rapide sur cheveux propres et secs, uniquement pour entretenir votre coupe. Pas de transformation, juste un rafraîchissement !',
              price: 30,
              duration_minutes: 30,
              subprestation_id: 6,
          },
        // , {
        //       name: 'Barrel',
        //       description: 'Barrel',
        //       price: 20,
        //       duration_minutes: 40,
        //       subprestation_id: 2,
        //   },
        //   {
        //       name: 'Vanille/Tresse',
        //       description: 'Vanille ou Tresse',
        //       price: 35,
        //       duration_minutes: 40,
        //       subprestation_id: 2,
        //   },
        //   {
        //       name: 'Knot Bob',
        //       description: 'Knot Bob',
        //       price: 60,
        //       duration_minutes: 40,
        //       subprestation_id: 2,
        //   }
        //
          ], {});

  },


  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
