/*Global Variable to select the Section tag I am updating*/
const sect = document.querySelector("#spot");
const resetDate = document.getElementById("depDate").value;
const resetDest = document.getElementById("dest").value;

const updateUI = (res) => {
    const {temps, feelings, date} = res;

    const div1 = document.createElement("div");
    const div2 = document.createElement("div");

    div1.setAttribute("class", "grid-item");
    div2.setAttribute("class", "card-content");
    let results = document.createElement('h2');
    results.innerHTML = "Your Results:";
    let Temp = document.createElement('p');
    Temp.innerHTML = `Temperature: ${temps}`;
    let Feel = document.createElement('p');
    Feel.innerHTML = `Your trip is in: ${feelings} days`;
    let Pic = document.createElement('img');
    Pic.setAttribute("src", `${date}`);
    let butt = document.createElement('button');
    butt.setAttribute("class", "card-btn");
    butt.innerHTML = "Delete";
    sect.removeAttribute("hidden");

    div1.append(Pic);
    div2.append(results);
    div2.append(Temp);
    div2.append(Feel);
    div2.append(butt);
    sect.appendChild(div1);
    div1.appendChild(div2);

   // resetDate.setAttribute("placeholder", "MM/DD/YYYY");
   // resetDest.innerHTML = "";
}

export {updateUI};