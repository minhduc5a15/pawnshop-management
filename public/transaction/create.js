const active_bar = document.getElementById("active_bar");
const btn_x = document.getElementById("btn_x");
const btn_pay = document.getElementById("btn_pay_interest");
const btn_re = document.getElementById("btn_redeem");
const btn_li = document.getElementById("btn_liquidate");

const pages = {
  1: document.getElementById("page_x"),
  2: document.getElementById("page_pay"),
  3: document.getElementById("page_redeem"),
  4: document.getElementById("page_liquidate"),
};

const translateClasses = [
  "translate-x-31.6",
  "translate-x-147.2",
  "translate-x-262.8",
  "translate-x-378.4",
];

function ChangeActiveBar(x) {
  // Remove all translate-x classes
  active_bar.classList.remove(...translateClasses);

  // Hide all pages
  Object.values(pages).forEach((page) => {
    page.classList.remove("flex");
    page.classList.add("hidden");
  });

  // Add the appropriate translate-x class
  active_bar.classList.add(translateClasses[x - 1]);

  // Show the correct page
  pages[x].classList.add("flex");
  pages[x].classList.remove("hidden");
}

btn_x.addEventListener("click", () => ChangeActiveBar(1));
btn_pay.addEventListener("click", () => ChangeActiveBar(2));
btn_re.addEventListener("click", () => ChangeActiveBar(3));
btn_li.addEventListener("click", () => ChangeActiveBar(4));
