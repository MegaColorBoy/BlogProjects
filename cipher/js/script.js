//This code contains all the Cipher implementations

$(document).ready(function(){
	init_main("atbash");
	init_main("affine");
	init_main("caesar");
});

function gen_keys(option)
{
	var html = "";
	switch(option)
	{
		case "caesar_shift_key":
		case "affine_key_b":
			for(var i=0;i<26;i++)
			{
				html += '<option value="' + i + '">' + i + '</option>';
			}
			break;

		case "affine_key_a":
			for(var i=0;i<26;i++)
			{
				if(i%2 == 1)
				{
					html += '<option value="' + i + '">' + i + '</option>';
				}
			}
			break;
	}
	
	return html;
}

function gen_template(id, template_data)
{
	var html = "";

	for(var i=0; i<template_data.length; i++)
	{
		var element = template_data[i];
		var elementType = element.type;
		var divHTML = "";

		switch(elementType)
		{
			case "textarea":
				divHTML = `
				<div class="boxitem">
					<label>` + element.title + `</label>
					<textarea id="` + element.id + `" rows="4" cols="50" placeholder="` + element.placeholder + `"></textarea>
				</div>
				`;
				break;

			case "selectbox":
				divHTML = `
				<div class="boxitem selectbox">
					<label>` + element.title + `</label>
					<select id="` + element.id + `">` + element.data + `</select>
				</div>
				`;
				break;
		}

		html += divHTML;
	}

	return html;
}

function init_main(program)
{
	var html = "";
	var div = "";

	switch(program)
	{
		case "caesar":
			div = "caesar_cipher_div";
			template_data = [
				{
					"id": "caesar_plaintext",
					"title": "Plaintext",
					"placeholder": "Enter plaintext",
					"type": "textarea"
				},
				{
					"id": "caesar_ciphertext",
					"title": "Ciphertext",
					"placeholder": "Enter ciphertext",
					"type": "textarea"
				},
				{
					"id": "caesar_shift_key",
					"title": "Key:",
					"data": gen_keys("caesar_shift_key"),
					"type": "selectbox"
				}
			];	
			break;

		case "affine":
			div = "affine_cipher_div";
			template_data = [
				{
					"id": "affine_plaintext",
					"title": "Plaintext",
					"placeholder": "Enter plaintext",
					"type": "textarea"
				},
				{
					"id": "affine_ciphertext",
					"title": "Ciphertext",
					"placeholder": "Enter ciphertext",
					"type": "textarea"
				},
				{
					"id": "affine_key_a",
					"title": "Key A:",
					"data": gen_keys("affine_key_a"),
					"type": "selectbox"
				},
				{
					"id": "affine_key_b",
					"title": "Key B:",
					"data": gen_keys("affine_key_b"),
					"type": "selectbox"
				}
			];	
			break;

		case "atbash":
			div = "atbash_cipher_div";
			template_data = [
				{
					"id": "atbash_plaintext",
					"title": "Plaintext",
					"placeholder": "Enter plaintext",
					"type": "textarea"
				},
				{
					"id": "atbash_ciphertext",
					"title": "Ciphertext",
					"placeholder": "Enter ciphertext",
					"type": "textarea"
				}
			];
			break;
	}

	html += gen_template(div, template_data);

	//buttons
	var buttonBar = `
	<div class="box_buttons">
		<button id="` + program.toString() + `_enc">encrypt</button>
		<button id="` + program.toString() + `_dec">decrypt</button>
		<button id="` + program.toString() + `_reset">reset</button>
	</div>
	`;

	html += buttonBar;

	var getDiv = document.getElementById(div);
	getDiv.innerHTML = html;
}

//Modular Inverse -- brute force method
function mod_inverse(a,b)
{
	a %= b;
	for(var x=1; x<b; x++)
	{
		if((a * x) % b == 1)
		{
			return x;
		}
	}
}

//For Affine Cipher
$(function(){
	$("#affine_enc").click(function(){
		var a = parseInt(document.getElementById("affine_key_a").value);
		var b = parseInt(document.getElementById("affine_key_b").value);
		var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

		var plaintext = $("#affine_plaintext").val().toUpperCase().trim();
		var enctext = "";
		for(var i=0; i<plaintext.length; i++)
		{
			var x = alpha.indexOf(plaintext.charAt(i));
			
			//pos = a * x + b % 26
			var newpos = (((a * x) + b) % 26);
			enctext += alpha.charAt(newpos);
		}
		$("#affine_ciphertext").val(enctext);
	});

	$("#affine_dec").click(function(){
		//alert("dec");
		var a = parseInt(document.getElementById("affine_key_a").value);
		var b = parseInt(document.getElementById("affine_key_b").value);
		var alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

		var ciphertext = $("#affine_ciphertext").val().toUpperCase().trim();
		var dectext = "";

		//Using modular inverse to find the key
		var a_inv = mod_inverse(a,26);
		//alert(a_inv);

		for(var i=0; i<ciphertext.length; i++)
		{
			var y = alpha.indexOf(ciphertext.charAt(i));
			// a^-1(y-b) % 26
			var newpos = (a_inv * (y-b));
			newpos %= 26;
			if(newpos < 0){newpos = 26 + newpos;}
			dectext += alpha.charAt(newpos);
		}
		$("#affine_plaintext").val(dectext);
	});

	//Reset function for Affine
	$("#affine_reset").click(function(){
		// alert("reset");
		$("#affine_plaintext").val('');
		$("#affine_ciphertext").val('');
	})
});


//For Atbash Cipher
$(function(){
	var alpha = " .,?!ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	var rev_alpha = "9876543210ZYXWVUTSRQPONMLKJIHGFEDCBA!?,. ";
	//Encrypt function for atbash
	$("#atbash_enc").click(function(){
		// alert("encrypt");
		var plaintext = $("#atbash_plaintext").val().toUpperCase();
		var enctext = "";
		for(var i=0; i<plaintext.length; i++)
		{
			var pos = alpha.indexOf(plaintext.charAt(i));
			enctext += rev_alpha.charAt(pos);
		}
		$("#atbash_ciphertext").val(enctext);
	});

	//Decrypt function for atbash
	$("#atbash_dec").click(function(){
		// alert("decrypt");
		var ciphertext = $("#atbash_ciphertext").val().toUpperCase();
		var dectext = "";
		for(var i=0; i<ciphertext.length; i++)
		{
			var pos = rev_alpha.indexOf(ciphertext.charAt(i));
			dectext += alpha.charAt(pos);
		}
		$("#atbash_plaintext").val(dectext);
	});

	//Reset function for atbash
	$("#atbash_reset").click(function(){
		$("#atbash_plaintext").val('');
		$("#atbash_ciphertext").val('');
	})
});

//For Caesar Cipher
$(function(){
	//Regex pattern
	var regex = /[a-z]/;

	//Encrypt function for Caesar
	$("#caesar_enc").click(function(){
		// alert("encrypt");
		var plaintext = $("#caesar_plaintext").val();
		var ciphertext = "";
		var key = parseInt(document.getElementById("caesar_shift_key").value);
		// alert(key);
		for(var i=0;i<plaintext.length;i++)
		{
			//check if it matches the regex pattern
			if(regex.test(plaintext.charAt(i)))
			{
				ciphertext += String.fromCharCode((plaintext.charCodeAt(i) - 97 + key)%26 + 97);
				//alert(ciphertext);
			}
			else
			{
				ciphertext += plaintext.charAt(i);
			}
		}
		$("#caesar_ciphertext").val(ciphertext);
	});

	//Decrypt function for Caesar
	$("#caesar_dec").click(function(){
		// alert("decrypt");
		var ciphertext = $("#caesar_ciphertext").val();
		var plaintext = "";
		var key = parseInt(document.getElementById("caesar_shift_key").value);
		for(var i=0;i<ciphertext.length;i++)
		{
			if(regex.test(ciphertext.charAt(i)))
			{
				plaintext += String.fromCharCode((ciphertext.charCodeAt(i) - 97 + 26 - key) % 26 + 97);
			}
			else
			{
				plaintext += ciphertext.charAt(i);
			}
		}
		$("#caesar_plaintext").val(plaintext);
	});

	//Reset function for Caesar
	$("#caesar_reset").click(function(){
		// alert("reset");
		$("#caesar_plaintext").val('');
		$("#caesar_ciphertext").val('');
	})
});





