import './ContactUs.css';
import emailjs from 'emailjs-com';


function ContactUs() {

    function sendEmail(e){
        e.preventDefault();

        emailjs.sendForm('gmail', 'template_oxnqk1g', e.target , 'user_tSfGx6fZb1jLtEzL2nAPk')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });

      e.target.reset()

    }
  return (
    <div
      class="contact2"
      style={{
        backgroundImage:
          "url(https://i.pinimg.com/564x/2a/e6/67/2ae6673087ae72392f11f299eb4a102b.jpg)",
        backgroundColor: "gray",
      }}
      id="contact"
    >
        
      <div class="container">
        <div class="row contact-container">
          <div class="col-lg-12">
            <div class="card card-shadow border-0 mb-4">
              <div class="row shadow">
                <div class="col-lg-8">
                  <div class="contact-box p-4">
                    <h4 class="title text-primary">Contact Us</h4>
                    <form onSubmit={sendEmail} >
                      <div class="row">
                        <div class="col-lg-6">
                          <div class="form-group mt-3">
                            <input
                              class="form-control"
                              type="text"
                              placeholder="name"
                              name="from_name"
                              required
                            />
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="form-group mt-3">
                            <input
                              class="form-control"
                              type="text"
                              placeholder="email"
                              name="email"
                              required
                            />
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="form-group mt-3">
                            <input
                              class="form-control"
                              type="text"
                              placeholder="phone"
                              name="phone"
                              required
                            />
                          </div>
                        </div>
                        <div class="col-lg-6">
                          <div class="form-group mt-3">
                            <input
                              class="form-control"
                              type="text"
                              placeholder="location"
                              name="location"
                              required
                            />
                          </div>
                        </div>
                        <div class="col-lg-12">
                          <div class="form-group mt-3">
                            <textarea
                              class="form-control"
                              placeholder="message"
                              name="message"
                              required
                            ></textarea>
                          </div>
                        </div>
                        <div class="col-lg-12">
                          <button
                            type="submit"
                            class="btn btn-danger-gradiant mt-3 mb-3 text-white border-0 py-2 px-3"
                          >
                            <span>
                              {" "}
                              SUBMIT NOW <i class="ti-arrow-right"></i>
                            </span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div
                  class="col-lg-4 bg-image"
                  style={{
                    backgroundImage:
                      "url(https://i.pinimg.com/564x/4d/a6/c0/4da6c0eab2cf32fe6c7049483ba4a88b.jpg)",
                  }}
                >
                  <div class="detail-box p-4">
                    <h5 class="text-white fw-bold">ADDRESS</h5>
                    <p class="text-primary fw-bold">
                      Egypt, Aswan.
                      <br />
                      ITI - Joy
                    </p>
                    <h5 class="text-white fw-bold mt-5">
                      CALL US
                    </h5>
                    <p class="text-primary fw-bold fs-5">
                      010 1214 3511
                      <br />
                      010 2971 8897
                    </p>
                    <div class="round-social light">
                      <a
                        href="#"
                        class="ml-0 text-decoration-none text-white border border-white rounded-circle"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          class="bi bi-facebook"
                          viewBox="0 0 16 16"
                        >
                          <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                        </svg>
                      </a>
                      <a
                        href="#"
                        class="text-decoration-none text-white border border-white rounded-circle"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          class="bi bi-twitter"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z" />
                        </svg>
                      </a>
                      <a
                        href="#"
                        class="text-decoration-none text-white border border-white rounded-circle"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-youtube"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.007 2.007 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.007 2.007 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31.4 31.4 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.007 2.007 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A99.788 99.788 0 0 1 7.858 2h.193zM6.4 5.209v4.818l4.157-2.408L6.4 5.209z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
