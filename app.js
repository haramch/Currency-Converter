let baseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdownSelect=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const tocurr=document.querySelector(".to select");
const fromcurr=document.querySelector(".from select");
let msg=document.querySelector(".msg");

for(let select of dropdownSelect)
{
    for(currCode in countryList)
    {
       let  newOption=document.createElement("option");
       newOption.innerText=currCode;
       newOption.value=currCode;
       if(select.name==="from" && currCode==="USD")
         {
            newOption.selected="selected";
         }
         else if(select.name==="to" && currCode==="PKR")
         {
            newOption.selected="selected";
         }

       select.append(newOption);
    }
    select.addEventListener("change", (evt)=>
    {
        updateFlag(evt.target);
    })
}

const updateFlag=(element)=>
{
   let currCode=element.value;
   let countryCode=countryList[currCode];
   let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
   let img=element.parentElement.querySelector("img");
   img.src=newSrc;
}

const updateExchangeRate = async () =>
{
    let amount=document.querySelector(".amount input");
    let amountVal=amount.value;
    if(amountVal==="" || amountVal < 1)
    {
        amountVal=1;
        amount.value=1;
    }

    const URL = `${baseURL}/${fromcurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data=await response.json();
    let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];


    let finalAmt=amountVal*rate;
    msg.innerText=`${amountVal} ${fromcurr.value}=${finalAmt}${tocurr.value}`;

};
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
