import { useState } from "react";
import { linkUrl } from "../utils";
import { useApiFetchPrice } from "./useApiFetchPrice";

export const useApiFetchEditPrice = () => {
  const [loadingComparedFiles, setLoadingComparedFiles] = useState(false);
  const [errorComparedFiles, setErrorComparedFiles] = useState(false);
  const [comparedFilesSucceed, setComparedFilesSucceed] = useState(false);
  const {setPricedFetch} = useApiFetchPrice();

  const fetchEditPrice = async (url, id, name, values) => {
    setLoadingComparedFiles(true);
    let bodyObj = {};

    switch (name) {
      case 'covers':
        bodyObj = {body: JSON.stringify({
          id: id,
          shade_ceiling: values[0].shade_ceiling,
          semi_trailer: values[0].semi_trailer,
          semi_trailer_with_covers: values[0].semi_trailer_with_covers,
          semi_trailer_three_way: values[0].semi_trailer_three_way,
          ratchet_cover: values[0].ratchet_cover,
          simple_trailer_cover: values[0].simple_trailer_cover
        })};
        break;
      case 'windproof':
        bodyObj = {body: JSON.stringify({
          id: id,
          price_plastic_knobs: values[0].price_plastic_knobs,
          price_metal_knobs: values[0].price_metal_knobs,
          price_strap_plates: values[0].price_strap_plates,
          price_pockets: values[0].price_pockets,
          price_zip: values[0].price_zip,
          price_knobs: values[0].price_knobs,
          price_curtain: values[0].price_curtain
        })};
        break;
      case 'gondola':
        bodyObj = {body: JSON.stringify({
          id: id,
          longitudinal_pocket_price: values[0].longitudinal_pocket_price,
          fitting_price: values[0].fitting_price,
          assembly_price: values[0].assembly_price,
          tarpaulin_price_1: values[0].tarpaulin_price_1,
          tarpaulin_price_2: values[0].tarpaulin_price_2
        })};
        break;
      case 'with':
        bodyObj = {body: JSON.stringify({
          id: id,
          with_shutter_price: values
        })};
        break;
      case 'without':
        bodyObj = {body: JSON.stringify({
          id: id,
          without_shutters_price: values
        })};
        break;
      default:
        bodyObj = {}
    }

    try {
      const response = await fetch(`${linkUrl()}${url}`, {
        method: "PUT",
        ...bodyObj,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }
      });

      const resultPrice = await response.json();

      if (response.ok) {
        setPricedFetch(resultPrice[0].result);
        setComparedFilesSucceed(true);
        setLoadingComparedFiles(false);
        setErrorComparedFiles(false);
      } else {
        throw new Error(response.statusText);
      }
    } catch (error) {
      setErrorComparedFiles(`${error} Could not Fetch Data `);
      setLoadingComparedFiles(false);
    }
  };

  return { loadingComparedFiles, errorComparedFiles, fetchEditPrice, comparedFilesSucceed };
};