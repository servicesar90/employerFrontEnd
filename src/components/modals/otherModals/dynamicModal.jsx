import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Chip,
  Input,
  Box
} from "@mui/material";
import { updateCompany } from "../../../API/ApiFunctions";
import { showErrorToast, showSuccessToast } from "../../ui/toast";

const DynamicModal = ({ open, onClose, fields, type, suggestions }) => {
  const { register, handleSubmit, setValue, watch } = useForm({
    defaultValues: fields,
  });
  
  const [buttonEnable, setButtonEnable] = useState(true)

  const onSubmit = async(data) => {
    setButtonEnable(false)
    const response = await updateCompany(data);
    if(response){
      console.log(response)
      showSuccessToast("Successfully updated")
    }else{
      showErrorToast("could not updated");
      setButtonEnable(true)
    }
    onClose();
  };

  // Handle adding/removing values in multi-select
  const handleAddChip = (fieldName, value) => {
    const currentValues = watch(fieldName) || [];
    if (!currentValues.includes(value)) {
      setValue(fieldName, [...currentValues, value]);
    }
  };

  const handleRemoveChip = (fieldName, value) => {
    const currentValues = watch(fieldName) || [];
    setValue(fieldName, currentValues.filter((item) => item !== value));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle className="text-xl font-semibold">Update Profile</DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 mt-2">
          {Object.entries(fields).map(([key, value]) => {
            const fieldType = type?.[key] || "text";
            const fieldSuggestions = suggestions?.[key];

 

            // Render radio buttons
            if (fieldType === "radio" && Array.isArray(fieldSuggestions)) {
              return (
                <FormControl key={key} component="fieldset">
                  <FormLabel component="legend" className="mb-1">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </FormLabel>
                  <RadioGroup row defaultValue={value}>
                    {fieldSuggestions.map((option, idx) => (
                      <FormControlLabel
                        key={idx}
                        value={option}
                        control={<Radio />}
                        label={option}
                        {...register(key)}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              );
            }

            // Render select dropdown
            if (fieldSuggestions && Array.isArray(fieldSuggestions) && fieldType !== "multi") {
              return (
                <TextField
                  key={key}
                  label={key.charAt(0).toUpperCase() + key.slice(1)}
                  select
                  defaultValue={value}
                  {...register(key)}
                  fullWidth
                  variant="outlined"
                  size="small"
                >
                  {fieldSuggestions.map((option, idx) => (
                    <MenuItem key={idx} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              );
            }

            // Render multi-select (for multi-select type)
            if (fieldType === "multi" && Array.isArray(fieldSuggestions)) {
              const selectedValues = watch(key);

              return (
                <div key={key}>
                  <FormLabel component="legend" className="mb-1">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </FormLabel>
                  <Box className="flex flex-wrap gap-2 mb-2">
                    {selectedValues?.map((value, idx) => (
                      <Chip
                        key={idx}
                        label={value}
                        onDelete={() => handleRemoveChip(key, value)}
                        className="cursor-pointer"
                      />
                    ))}
                  </Box>
                  <TextField
                    select
                    label="Add a new value"
                    fullWidth
                    variant="outlined"
                    size="small"
                    onChange={(e) => handleAddChip(key, e.target.value)}
                    defaultValue=""
                  >
                    <MenuItem value="">
                      <em>Select</em>
                    </MenuItem>
                    {fieldSuggestions.map((option, idx) => (
                      <MenuItem key={idx} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </div>
              );
            }

            // Render normal input
            return (
              <TextField
                key={key}
                label={key.charAt(0).toUpperCase() + key.slice(1)}
                type={fieldType}
                defaultValue={value}
                {...register(key)}
                fullWidth
                variant="outlined"
                size="small"
              />
            );
          })}

          <div className="flex justify-end gap-3 pt-2">
            <Button onClick={onClose} variant="outlined" color="secondary">
              Cancel
            </Button>
            <Button type="submit" disabled={!buttonEnable} variant="contained" color="primary">
              Save
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DynamicModal;
