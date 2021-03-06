import { Wxrd } from './Wxrd';

export class Djehuti {

	constructor(){

	}

	createWxrd(multiLineInput) {

		return new Wxrd(multiLineInput);
	}

	importWxrdFromJson(jsonString) {

		if(!this.hasJsonStructure(jsonString)){

			throw "can't import json from non-json string";
		}

		const parsed = JSON.parse(jsonString);

		return new Wxrd(parsed);
	}

	hasJsonStructure(str) {
	
		// adapted from: https://stackoverflow.com/a/52799327/670768
		if (typeof str !== 'string') {
			return false;
		}

	    try {
	    
	        const result = JSON.parse(str);
	        const type = Object.prototype.toString.call(result);
	        return type === '[object Object]' 
	            || type === '[object Array]';
	    
	    } catch (err) {
	    
	        return false;
	    }
	}
}