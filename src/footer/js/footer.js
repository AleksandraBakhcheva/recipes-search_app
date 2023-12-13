class MyFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<footer>
    <div class="footer__container_color">
        <div class="footer__container">
            <div class="logo_footer">
                <a href="#header">
                    <img class="logo__img_footer" src="assets/images/logo.svg" alt="logo" />
                </a>
            </div>
            <p class="copyright"></p>
        </div>
    </div>
</footer>`;
  }
}

customElements.define("my-footer", MyFooter);

let year = document.querySelector(".copyright");
year.textContent = "Copyright © " + new Date().getFullYear();
