import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../../Redux/getData";

const GstVerifyModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [panNumber, setPanNumber] = useState("");
  const [showGstInformation, setShowGstnformation] = useState(false);
  const [gstInformation, setGstInformation] = useState(null);
  const gstRef = useRef();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const { employer } = useSelector((state) => state.getDataReducer);

  const handleGstVerify = async (value) => {
    const response = await gstVerify(value);
    if (response) {
      setGstInformation(response.data?.data?.taxpayerInfo);
      setShowGstnformation(true);
    } else {
      showErrorToast("could not verify");
    }
  };

  const handleGstCheckBox = async () => {
    const infoObj = {
      tradeNam: gstInformation?.tradeNam,
      rgdt: gstInformation?.rgdt,
      ctj: gstInformation?.ctj,
      lstupdt: gstInformation?.lstupdt,
      ctb: gstInformation?.ctb,
      dty: gstInformation?.dty,
      panNo: gstInformation?.panNo,
      gstin: gstInformation?.gstin,
      stjCd: gstInformation?.stjCd,
      ctjCd: gstInformation?.ctjCd,
      stj: gstInformation?.stj,
      cxdt: gstInformation?.cxdt,
      adadr: gstInformation?.adadr,
      einvoiceStatus: gstInformation?.einvoiceStatus,
      nba: gstInformation?.nba,
      sts: gstInformation?.sts,
      ntr: gstInformation?.pradr?.ntr,
      flno: gstInformation?.pradr?.addr?.flno,
      lt: gstInformation?.pradr?.addr?.lt,
      st: gstInformation?.pradr?.addr?.st,
      dst: gstInformation?.pradr?.addr?.dst,
      geocodelvl: gstInformation?.pradr?.addr?.geocodelvl,
      locality: gstInformation?.pradr?.addr?.locality,
      bnm: gstInformation?.pradr?.addr?.bnm,
      pncd: gstInformation?.pradr?.addr?.pncd,
      landMark: gstInformation?.pradr?.addr?.landMark,
      bno: gstInformation?.pradr?.addr?.bno,
      loc: gstInformation?.pradr?.addr?.loc,
      lg: gstInformation?.pradr?.addr?.lg,
      stcd: gstInformation?.pradr?.addr?.stcd,
    };

    if (gstInformation?.sts == "Active") {
      const response = await postGstVerify(gstInformation?.gstin, infoObj);
      if (response) {
        dispatch(fetchUserProfile);
      } else {
        showErrorToast("could not verified");
      }
    } else {
      showErrorToast("Your GST is expired");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          borderRadius: 2,
          boxShadow: 24,
          maxHeight: "80vh",
          overflow: "scroll",
          p: 4,
          width: {
            xs: "80%",
            lg: "50%",
          },
          maxWidth: "100vw",
        }}
      >
        <Typography variant="h6" className="mb-2 font-semibold text-center">
          Please Verify Yourself
        </Typography>
        <Typography className="text-sm text-gray-600 mb-4 text-center">
          Enter Your GST Number or PAN Number
        </Typography>

        <Box className="space-y-3 my-4">
          <Typography className="text-sm font-medium">
            Enter Your GST Number
          </Typography>
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{
                color: "#003B70",
                fontSize: "14px",
                fontWeight: "500",
                marginBottom: "8px",
                display: "block",
              }}
            >
              GST No.
            </label>
            <input
              type="text"
              ref={gstRef}
              value={employer?.is_verified ? employer?.gstin : null}
              className="w-full px-4 py-3 rounded-md border transition-all duration-200 focus:outline-none focus:ring-2"
              style={{
                width: "100%",
                padding: "12px 16px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
                backgroundColor: "white",
                color: "#003B70",
                fontSize: "14px",
                focusRingColor: "#0784C9",
              }}
            />
          </div>
          <div className="flex items-end">
            <button
              type="button"
              disabled={employer?.is_verified}
              onClick={() => handleGstVerify(gstRef.current.value)}
              className={`w-full px-6 py-3 rounded-md text-sm font-medium transition-all duration-200
    ${
      employer?.is_verified
        ? "bg-gray-200 text-gray-500 border border-gray-300 cursor-not-allowed"
        : "bg-transparent text-[#0784C9] border-2 border-[#0784C9] hover:bg-blue-50 hover:text-[#0567A3]"
    }`}
            >
              {employer?.is_verified ? "Verified" : "verify"}
            </button>
          </div>
        </Box>

        {(showGstInformation || employer?.is_verified) && (
          <div className="max-w-3xl mx-auto p-4">
            <div className="bg-gray-100 border border-gray-300 rounded-md p-4 mb-3">
              <p className="text-sm font-medium mb-2 text-gray-700">
                We found following company details
              </p>
              <p className="text-sm">
                <strong>Company name:</strong>{" "}
                <span className="text-blue-700 font-medium">
                  {gstInformation?.tradeNam
                    ? gstInformation?.tradeNam
                    : employer?.GstDetail?.tradeNam}
                </span>
              </p>
              <p className="text-sm text-gray-800 mt-1">
                <strong>Address:</strong>{" "}
                {gstInformation?.pradr?.addr?.bno || employer?.GstDetail?.bno},{" "}
                {gstInformation?.pradr?.addr?.bnm || employer?.GstDetail?.bnm},{" "}
                {gstInformation?.pradr?.addr?.locality ||
                  employer?.GstDetail?.locality}
                , {gstInformation?.pradr?.addr?.dst || employer?.GstDetail?.dst}
                , {gstInformation?.pradr?.addr?.loc || employer?.GstDetail?.loc}
                ,{" "}
                {gstInformation?.pradr?.addr?.stcd || employer?.GstDetail?.stcd}
                ,{" "}
                {gstInformation?.pradr?.addr?.pncd || employer?.GstDetail?.pncd}
              </p>
            </div>

            <label className="flex items-start gap-2 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={employer?.is_verified}
                onChange={
                  !employer?.is_verified ? handleGstCheckBox : undefined
                }
                disabled={employer?.is_verified}
                className="mt-1 cursor-pointer disabled:cursor-not-allowed"
              />
              <span>
                I verify my company details and understand that the invoices
                would be generated using the same information.
              </span>
            </label>
          </div>
        )}

        <Divider className="my-4">OR</Divider>

        <Box className="space-y-3">
          <Typography className="text-sm font-medium">
            Enter Your PAN Number
          </Typography>
          <TextField
            fullWidth
            size="small"
            label="PAN Number"
            value={panNumber}
            onChange={(e) => setPanNumber(e.target.value)}
          />
          <Button variant="contained">Verify</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default GstVerifyModal;
