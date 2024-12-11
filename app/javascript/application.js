// Entry point for the build script in your package.json
import "@hotwired/turbo-rails"
import "./controllers"
import "./components"
import Rails from "@rails/ujs"
import Turbolinks from "turbolinks"
import * as bootstrap from "bootstrap"

Rails.start()
Turbolinks.start()
