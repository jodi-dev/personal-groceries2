$(document).ready(function(){
    let content = '';

    if (allergiesChecked.length == 0) {
        all_items.forEach(p=> {
            content += 
            `
                <div class="card">
                    <div class="card-body">
                        <div class="form-check pull-right">
                            <input class="form-check-input" type="checkbox" name="product" id=${p[0]} value=${p[0]}>
                            <label class="form-check-label"></label>
                        </div>
                        <h4 class="card-title">${p[0]}</h4>
                        <p class="card-text">$ ${p[1]}</p>
                    </div>
                </div>
            `
        });
        document.getElementById("shop").innerHTML = content;
    }
});

function test() {
}

var chosenProducts = {};

function updateShop(shop) {
    let filtered = [];
    let v;
    //alert("my allergies are: " + allergiesChecked.join(","));
    if (organicOnly == false && allergiesChecked.length > 0) {
        for (let i = 0; i<all_items.length; i+=1) {
            v = true;
            for (let j = 0; j<allergiesChecked.length; j+=1) {
                if (all_items[i][2] == allergiesChecked[j]) {
                    v = false;
                }
            }
            if (v == true) {
                filtered.push(all_items[i]);
            }
            //filtered.push(all_items[i]);
        }
    }
    if (organicOnly == true && allergiesChecked.length == 0) {
        for (let i = 0; i<all_items.length; i+=1) {
            if (all_items[i][3] == 'y') {
                filtered.push(all_items[i]);
            }
            //filtered.push(all_items[i]);
        }
    }
    if (organicOnly == true && allergiesChecked.length > 0) {
        for (let i = 0; i<all_items.length; i+=1) {
            v = true;
            for (let j = 0; j<allergiesChecked.length; j+=1) {
                if (all_items[i][2] == allergiesChecked[j]) {
                    v = false;
                }
                if (all_items[i][3] != 'y') {
                    v = false;
                }
            }
            if (v == true) {
                filtered.push(all_items[i]);
            }
            //filtered.push(all_items[i]);
        }
    }
    if (organicOnly == false && allergiesChecked.length == 0) {
        filtered = all_items;
    }
    //alert("my items are: " + filtered.join(","));
    filtered_items = filtered;
    
    var shop = document.getElementById(shop);	
    shop.innerHTML = "";

	for (let i = 0; i < filtered_items.length; i+= 1) {

        var productName = filtered_items[i][0];
        var productPrice = filtered_items[i][1];
		let card = document.createElement('div');
        card.className = 'card';
        let cardBody = document.createElement('div');
        cardBody.className = 'card-body';
        let formCheck = document.createElement('div');
        formCheck.className = 'form-check pull-right';
        let checkBox = document.createElement("input");
        checkBox.className = "form-check-input";
        checkBox.type = "checkbox";
		checkBox.name = "product";
        checkBox.id = productName;
		checkBox.value = productName;
        let cardTitle = document.createElement('h4');
        cardTitle.innerText = productName;
        let cardText = document.createElement('p');
        cardText.className = 'card-text';
        cardText.innerText = '$ ' + productPrice;

        var label = document.createElement('label')
        label.className = 'form-check-label';
		//label.htmlFor = productName;
		//label.appendChild(document.createTextNode(productName));

        formCheck.appendChild(checkBox);
        formCheck.appendChild(label);
        cardBody.appendChild(formCheck);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        card.appendChild(cardBody);
        shop.appendChild(card);
	}
}

function selectedItems(){
	
	let ele = document.getElementsByName("product"); // returns object node list
	
	let c = document.getElementById('displayCart');
	c.innerHTML = "";
	
	// build list of selected item
	let para = document.createElement("p");
	for (i = 0; i < ele.length; i++) { 
		if (ele[i].checked) {
			para.appendChild(document.createTextNode(ele[i].value));
			para.appendChild(document.createElement("br"));
            if (!chosenProducts[ele[i].value]) {
                chosenProducts[ele[i].value] = 1;
            }
		}
	}
		
	// add paragraph and total price
	c.appendChild(para);
	c.appendChild(document.createTextNode("Total Price is: $" + getTotalPrice(chosenProducts)));
}

// Calculate the total price of items, with received parameter being a list of products
function getTotalPrice(chosenProducts) {
	totalPrice = 0;

    if (Object.keys(chosenProducts).length > 0) {
        // possible to have value as how many selected
        for (const [key, value] of Object.entries(chosenProducts)) {
            for (let j=0; j<all_items.length; j+= 1) {
                if (key == all_items[j][0]) {
                    totalPrice += parseInt(all_items[j][1]);
                }
            }
        }
    }
	
	return totalPrice;
}