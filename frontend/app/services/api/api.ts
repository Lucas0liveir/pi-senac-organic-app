/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
 * documentation for more details.
 */
import {
  ApiResponse, // @demo remove-current-line
  ApisauceInstance,
  create,
} from "apisauce"
import Config from "../../config"
import { GeneralApiProblem, getGeneralApiProblem } from "./apiProblem" // @demo remove-current-line
import type {
  AddressModel,
  ApiConfig,
  ApiFeedResponse,
  ApiUserResponse,
  User, // @demo remove-current-line
} from "./api.types"

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig

  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })
  }

  // @demo remove-block-start
  /**
   * Gets a list of recent React Native Radio episodes.
   */
  async getEpisodes(): Promise<{ kind: "ok"; episodes: any[] } | GeneralApiProblem> {
    // make the api call
    const response: ApiResponse<ApiFeedResponse> = await this.apisauce.get(
      `api.json?rss_url=https%3A%2F%2Ffeeds.simplecast.com%2FhEI_f9Dx`,
    )

    // the typical ways to die when calling an api
    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    // transform the data into the format we are expecting
    try {
      const rawData = response.data

      // This is where we transform the data into the shape we expect for our MST model.
      const episodes: any[] = rawData.items.map((raw) => ({
        ...raw,
      }))

      return { kind: "ok", episodes }
    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }
  // @demo remove-block-end

  async registerUser(payload: User): Promise<{ kind: "ok"; user: ApiUserResponse } | GeneralApiProblem> {

    const response: ApiResponse<ApiUserResponse> = await this.apisauce.post(`register`, payload)

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {

      const rawData = response.data

      const user = rawData

      return { kind: "ok", user }

    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  async registerAddress(userId: string, payload: AddressModel, token: string) {

    const response: ApiResponse<ApiUserResponse> = await this.apisauce.post(`user/${userId}/address`, payload, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {

      const rawData = response.data

      const user = rawData

      return { kind: "ok", user }

    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  async login(email: string, senha: string): Promise<{ kind: "ok"; user: ApiUserResponse, token: string } | GeneralApiProblem> {

    const response: ApiResponse<{ data: { user: ApiUserResponse, token: string } }> = await this.apisauce.post(`login`, { email, senha })

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {

      const rawData = response.data

      const user = rawData.data

      return { kind: "ok", ...user }

    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  async createPayment(customerId: string, amount: string, token: string): Promise<{ kind: "ok"; payment: { ephemeralkey: string, paymentIntent: string } } | GeneralApiProblem> {

    const response: ApiResponse<{ data: { ephemeralkey: string, paymentIntent: string } }> = await this.apisauce.post(`payment/${customerId}`, { amount }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {

      const rawData = response.data

      const payment = rawData.data
      console.log(payment);


      return { kind: "ok", payment }

    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

  async createSubs(customerId: string, token: string): Promise<{ kind: "ok"; payment: { ephemeralkey: string, paymentIntent: string } } | GeneralApiProblem> {

    const response: ApiResponse<{ data: { ephemeralkey: string, paymentIntent: string } }> = await this.apisauce.post(`subscription/${customerId}`, {}, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      const problem = getGeneralApiProblem(response)
      if (problem) return problem
    }

    try {

      const rawData = response.data

      const payment = rawData.data


      return { kind: "ok", payment }

    } catch (e) {
      if (__DEV__) {
        console.tron.error(`Bad data: ${e.message}\n${response.data}`, e.stack)
      }
      return { kind: "bad-data" }
    }
  }

}



// Singleton instance of the API for convenience
export const api = new Api()
