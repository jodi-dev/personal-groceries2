$(document).ready(function(){
    let content = '';

    if (allergiesChecked.length == 0) {
        all_items.forEach(p=> {
            content += 
            `
                <div class="card">
                    <div class="form-check groceries-forms pull-right">
                            <input class="form-check-input" type="checkbox" name="product" value=${p[0]}>
                            <label class="form-check-label"></label>
                    </div>
                    <div class="card-body">
                        <h4 class="card-title">${p[0]}</h4>
                        <p class="card-text">$ ${p[1]}</p>
                    </div>
                    <a onclick="chooseProductByClick()" class="stretched-link" id=${p[0]}></a>
                </div>
            `
        });
        document.getElementById("shop").innerHTML = content;
    }
});

// function chooseCheck() {
//     $('input[name="product"]').each(
//         function() {
//             if (this.checked) {
//                 chosenProducts = [];
//                 selectedItems();
//             } else {
//                 chosenProducts = [];
//                 selectedItems();
//             }
//         }
//     )
// }

function chooseProductByClick() {
    let prodName = event.target.id;
    $('input:checkbox[name="' + "product" + '"][value="' + prodName + '"]')
    .each(
        function() {
        if ( $(this).val() ==  prodName ) {
            if ($(this).is(':checked')) {
                $(this).attr("checked", false);
                chosenProducts = [];
                selectedItems();
            } else {
                $(this).attr("checked", true);
                chosenProducts = [];
                selectedItems();
            }
        }
        }
    )
}

var chosenProducts = {};

function updateShop(shop) {
    let filtered = [];
    let v;

    if (Object.keys(chosenProducts).length > 0) {
            $('#alertModal').modal('show');
            $('#alert').click(function() {
                for (var key in chosenProducts) {
                    delete chosenProducts[key];
                }
                let c = document.getElementById('displayCart');
                c.innerHTML = "";
            });
    }

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
        formCheck.className = 'form-check groceries-forms pull-right';
        let checkBox = document.createElement("input");
        checkBox.className = "form-check-input";
        checkBox.type = "checkbox";
		checkBox.name = "product";
        //checkBox.id = productName;
		checkBox.value = productName;
        let cardTitle = document.createElement('h4');
        cardTitle.innerText = productName;
        let cardText = document.createElement('p');
        cardText.className = 'card-text';
        cardText.innerText = '$ ' + productPrice;
        let stretchedLink = document.createElement('a');
        stretchedLink.className = "stretched-link";
        stretchedLink.id = productName;
        stretchedLink.onclick = chooseProductByClick;

        var label = document.createElement('label')
        label.className = 'form-check-label';
		//label.htmlFor = productName;
		//label.appendChild(document.createTextNode(productName));

        formCheck.appendChild(checkBox);
        formCheck.appendChild(label);
        card.appendChild(formCheck);
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardText);
        card.appendChild(cardBody);
        card.appendChild(stretchedLink);
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
            if (!chosenProducts[ele[i].value]) {
                chosenProducts[ele[i].value] = 1;
            }
            para.appendChild(document.createTextNode(ele[i].value));
            para.appendChild(document.createTextNode(" x " + chosenProducts[ele[i].value]));
			para.appendChild(document.createElement("br"));
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
                    totalPrice += value * parseInt(all_items[j][1]);
                }
            }
        }
    }
	
	return totalPrice;
}