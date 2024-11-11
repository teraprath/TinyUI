var dropdown = false;

// Show mobile menu
$(".mobile-open").click(function () {
	$(".mobile-open").hide(0);
	$(".mobile-menu").show(200);
});

// Hide mobile menu
$(".mobile-close").click(function () {
	$(".mobile-menu").hide(200);
	$(".mobile-open").show(200);
});

var currentDropDown = null;

// Show dropdown menu
$(".dropdown").click(function (e) {
	if (currentDropDown) {
		if (!$(e.target).closest(".dropdown-content").length) {
			$(currentDropDown).find(".dropdown-content").hide(100);
			if(this == currentDropDown) {
				dropdown = false;
				currentDropDown = null;
				return;
			}
		}
	}
	currentDropDown = this;
	$(currentDropDown).find(".dropdown-content").show(100);
	setTimeout(() => {
		dropdown = true
	}, 100)
});

// Hide dropdown menu
$(document).click(function (event) {
	if (dropdown == true) {
		if (!$(event.target).closest(currentDropDown).find(".dropdown-content").length) {
			$(currentDropDown).find(".dropdown-content").hide(100);
			currentDropDown = null;
			setTimeout(() => {
				dropdown = false
			}, 100)
		}
	}
});

// Accordion
var acc = document.getElementsByClassName("accordion");
var counter;

for (counter = 0; counter < acc.length; counter++) {
    acc[counter].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    });
}

// Select menu
var x, i, j, l, ll, selElmnt, a, b, c;
/* Look for any elements with the class "custom-select": */
x = document.getElementsByClassName("select-menu");
l = x.length;
for (i = 0; i < l; i++) {
	selElmnt = x[i].getElementsByTagName("select")[0];
	ll = selElmnt.length;
	/* For each element, create a new DIV that will act as the selected item: */
	a = document.createElement("DIV");
	a.setAttribute("class", "select-selected");
	a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
	x[i].appendChild(a);
	/* For each element, create a new DIV that will contain the option list: */
	b = document.createElement("DIV");
	b.setAttribute("class", "select-items select-hide");
	for (j = 1; j < ll; j++) {
		/* For each option in the original select element,
		create a new DIV that will act as an option item: */
		c = document.createElement("DIV");
		c.innerHTML = selElmnt.options[j].innerHTML;
		c.addEventListener("click", function (e) {
			/* When an item is clicked, update the original select box,
			and the selected item: */
			var y, i, k, s, h, sl, yl;
			s = this.parentNode.parentNode.getElementsByTagName("select")[0];
			sl = s.length;
			h = this.parentNode.previousSibling;
			for (i = 0; i < sl; i++) {
				if (s.options[i].innerHTML == this.innerHTML) {
					s.selectedIndex = i;
					h.innerHTML = this.innerHTML;
					y = this.parentNode.getElementsByClassName("same-as-selected");
					yl = y.length;
					for (k = 0; k < yl; k++) {
						y[k].removeAttribute("class");
					}
					this.setAttribute("class", "same-as-selected");
					break;
				}
			}
			h.click();
		});
		b.appendChild(c);
	}
	x[i].appendChild(b);
	a.addEventListener("click", function (e) {
		/* When the select box is clicked, close any other select boxes,
		and open/close the current select box: */
		e.stopPropagation();
		closeAllSelect(this);
		this.nextSibling.classList.toggle("select-hide");
		this.classList.toggle("select-arrow-active");
	});
}

function closeAllSelect(elmnt) {
	/* A function that will close all select boxes in the document,
	except the current select box: */
	var x, y, i, xl, yl, arrNo = [];
	x = document.getElementsByClassName("select-items");
	y = document.getElementsByClassName("select-selected");
	xl = x.length;
	yl = y.length;
	for (i = 0; i < yl; i++) {
		if (elmnt == y[i]) {
			arrNo.push(i)
		} else {
			y[i].classList.remove("select-arrow-active");
		}
	}
	for (i = 0; i < xl; i++) {
		if (arrNo.indexOf(i)) {
			x[i].classList.add("select-hide");
		}
	}
}

document.addEventListener("click", closeAllSelect);