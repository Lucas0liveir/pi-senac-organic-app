import { Request, Response } from "express";
import { AddressModel, UserResponseModel } from "../../types/type";
import { BadRequestError, NotFoundError } from "../../helper/api.error";
import AddressService from "../../service/address.service";

export const insertAddress = async (req: Request, res: Response) => {
  const address: AddressModel = { ...req.body };
  const { userId } = req.params;

  const user = await AddressService.insertAddress(userId, address);

  res.status(200).json({
    status: res.statusCode,
    user,
  });
};
