
import axios from "axios"

export function api(){
  const options = {
    headers: {
      accept: "application/vnd.github.v3.raw+json"
    }
  }
    axios.get(
      "https://api.github.com/repos/hapijs/hapi/contents/API.md",
      options
    ).then(function (response){
      let display = response.request.response
      display = display.toString().replace(/\/>/g, "></a>")
      return display
    })
}