import axios from "axios";
import { Product } from "./types";
import Papa from "papaparse";

export default {
  list: async (): Promise<Product[]> => {
    return axios
      .get(
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vQqMf8wgxLw4p27Z3HmNA4sRMBAITTB45ic8u9lZ_u-S_7k2eeXjjJLvMLVrrmx3u4g57wb5nbp8kMr/pub?output=csv",
        {
          responseType: "blob",
        }
      )
      .then((response) => {
        return new Promise<Product[]>((resolve, reject) => {
          Papa.parse(response.data, {
            header: true,
            complete: (results) => {
              const products = results.data as Product[];

              return resolve(
                products.map((product) => ({
                  ...product,
                  price: Number(product.price),
                }))
              );
            },
            error: (error) => {
              return reject(error.message);
            },
          });
        });
      });
  },
  mock: {
    list: (mock: string): Promise<Product[]> =>
      import(`./mocks/${mock}.json`).then((result) => result.default),
  },
};
