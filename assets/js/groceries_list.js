// name, price, allergen, bool
var all_items = [
    ['Pepsi', '2', 'none', 'n'],
    ['Bread', '2', 'gluten', 'n'],
    ['Blueberries🌱', '4', 'berries', 'y'],
    ['Milk🌱🥛', '4', 'dairy', 'y'],
    ['Cashews🌱🥜', '5', 'nuts', 'y'],
    ['Strawberries🌱', '5', 'berries', 'y'],
    ['Cereal', '5', 'gluten', 'n'],
    ['Peanuts🥜', '6', 'nuts', 'n'],
    ['Cheese🥛', '7', 'dairy', 'n'],
    ['Beef', '12', 'none', 'n'],
    ['Poutry', '13', 'none', 'n'],
    ['Mouthwash', '15', 'none', 'n']
]

var filtered_items;
var minPrice = 0;
var maxPrice = 100;

var allergiesChecked = [];
var organicOnly = false;

$(document).ready( function filterProds() {
    // document change listeners

    $('#nuts').change(function() {
        if(this.checked) {
            //alert('nuts allergy');
            if (! allergiesChecked.includes($(this).val())) {
                allergiesChecked.push($(this).val());
            }
        } else {
            //alert('remove nut allergy');
            if (allergiesChecked.includes($(this).val())) {
                var index = allergiesChecked.indexOf($(this).val());
                if (index >= 0) {
                    allergiesChecked.splice( index, 1);
                }
            }
        }
    });
    $('#dairy').change(function() {
        if(this.checked) {
            //alert('dairy allergy');
            if (! allergiesChecked.includes($(this).val())) {
                allergiesChecked.push($(this).val());
            }
        } else {
            //alert('remove dairy allergy');
            if (allergiesChecked.includes($(this).val())) {
                var index = allergiesChecked.indexOf($(this).val());
                if (index >= 0) {
                    allergiesChecked.splice( index, 1);
                }
            }
        }
    });
    $('#organic').change(function() {
        if (this.checked) {
            organicOnly = true;
        } else {
            organicOnly = false;
        }
    });

    // $('input[name="product"]').change(function() {
    //     selectedItems();
    // });

    $(document).on("change", 'input[name="product"]', function() { // keeping this implementation to allow tabbing
        // Your code here
        if (this.checked) {
            chosenProducts = {};
            selectedItems();
        } else {
            chosenProducts = {};
            selectedItems();
        }
    });

    $('#checkout').click(function() {
        //alert("You have checked out!");
        $('#checkedoutModal').modal('show');
        $('#checkedoutModal').on('hidden.bs.modal', function () {
            window.location.reload();
        });
    });

    // clear selections
    $("#clear").click(function() {
        //document.getElementById("nuts").checked = false;
        //document.getElementById("dairy").checked = false;
        //document.getElementById("berries").checked = false;
        //minPrice = 0;
        //maxPrice = 100;
        //allergiesChecked = [];
        window.location.reload();
    });

});