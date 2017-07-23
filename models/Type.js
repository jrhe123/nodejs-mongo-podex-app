var mongoose = require('mongoose');


// Mongoose Schema 
var typeSchema = new mongoose.Schema({
	name: String,
	color: {
		type: String,
		default: 'red'
	}
});

// Set foreign key
typeSchema.virtual('pokemons', {
	ref: 'Pokemon',
	localField: '_id',
	foreignField: 'types'
});

var Type = mongoose.model('Type', typeSchema);

module.exports = Type;