import {extend, is, setConstructor} from "./helpers"
import {extendDefinition} from "./definition"
import {extendModel, initModel, Model} from "./model"


export default function BasicModel(def) {
	let model = function (val = model.default) {
		return model.validate(val) ? val : undefined
	}

	setConstructor(model, BasicModel)
	initModel(model, def)
	return model
}

extend(BasicModel, Model, {
	extend(...newParts) {
		let child = extendModel(new BasicModel(extendDefinition(this.definition, newParts)), this)
		for (let part of newParts) {
			if (is(BasicModel, part)) child.assertions.push(...part.assertions)
		}

		return child
	}
})