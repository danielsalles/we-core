/**
 * membershippermission
 *
 * @module      :: Model
 * @description :: membershippermission model
 *
 */

module.exports = function Model(we) {
  // set sequelize model define and options
  var model = {
    definition: {
      controller: { type: we.db.Sequelize.STRING},
      action : { type: we.db.Sequelize.STRING },
      name : { type: we.db.Sequelize.STRING, allowNull: false, unique: true }
    },

    associations: {
      membershiproles:  {
        type: 'belongsToMany',
        model: 'membershiprole',
        inverse: 'permissions',
        through: 'membershiproles_membershippermissions',
        constraints: false
      }
    },

    options: {
      classMethods: {},
      instanceMethods: {
        toJSON: function() {
          var obj = this.get();

          delete obj.createdAt;
          delete obj.updatedAt;

          return obj;
        }
      },
      hooks: {}
    }
  }

  return model;
}