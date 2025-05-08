import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  Button,
  MenuItem,
  Chip,
} from '@mui/material';
import { Search, RefreshCcw } from 'lucide-react';

const educationOptions = [
  '10th pass',
  '12th pass',
  'ITI',
  'Diploma',
  'Graduate',
  'Post Graduate',
];

const SearchCandidatesForm = () => {
  const { control, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      type: 'any',
      keywords: '',
      location: '',
      activeIn: '6',
      minExperience: '',
      maxExperience: '',
      minSalary: '',
      maxSalary: '',
      education: [],
    },
  });

  const education = watch('education');

  const onSubmit = (data) => {
    console.log('Form submitted:', data);
  };

  const handleEducationToggle = (option) => {
    const updated = education.includes(option)
      ? education.filter((e) => e !== option)
      : [...education, option];
    setValue('education', updated);
  };

  return (
    <div className="bg-white rounded-xl shadow p-6 w-full max-w-4xl mx-auto mt-6">
      <h2 className="text-xl font-semibold mb-4">Search Candidates</h2>

      <div className="bg-gray-100 rounded-lg p-1 flex mb-6">
        <button className="bg-white text-sm px-4 py-2 rounded-md font-medium">Search manually</button>

      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Searching For */}
        <div>
          <FormLabel component="legend" className="text-sm mb-2 block">Searching for</FormLabel>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <RadioGroup row {...field}>
                <FormControlLabel value="freshers" control={<Radio />} label="Freshers only" />
                <FormControlLabel value="experienced" control={<Radio />} label="Experienced only" />
                <FormControlLabel value="any" control={<Radio />} label="Any" />
              </RadioGroup>
            )}
          />
        </div>

        {/* Keywords */}
        <Controller
          name="keywords"
          control={control}
          rules={{ required: 'Keywords are required' }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Keywords"
              fullWidth
              size='small'
              required
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        {/* Location */}
        <div className='mt-4'>
          <Controller
            name="location"
            control={control}

            render={({ field }) => (
              <TextField
                {...field}
                label="Current city/region"
                fullWidth
                size='small'
              />
            )}
          />
        </div>


        {/* Experience: Min / Max */}
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="minExperience"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Minimum experience" size='small' select fullWidth>
                {[...Array(21).keys()].map((val) => (
                  <MenuItem key={val} value={val}>{val} years</MenuItem>
                ))}
              </TextField>
            )}
          />
          <Controller
            name="maxExperience"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Maximum experience" size='small' select fullWidth>
                {[...Array(21).keys()].map((val) => (
                  <MenuItem key={val} value={val}>{val} years</MenuItem>
                ))}
              </TextField>
            )}
          />
        </div>

        {/* Salary: Min / Max */}
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="minSalary"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Min. salary in lakhs" size='small' select fullWidth>
                {[...Array(51).keys()].map((val) => (
                  <MenuItem key={val} value={val}>{val} LPA</MenuItem>
                ))}
              </TextField>
            )}
          />
          <Controller
            name="maxSalary"
            control={control}
            render={({ field }) => (
              <TextField {...field} label="Max. salary in lakhs" size='small' select fullWidth>
                {[...Array(51).keys()].map((val) => (
                  <MenuItem key={val} value={val}>{val} LPA</MenuItem>
                ))}
              </TextField>
            )}
          />
        </div>

        {/* Education Pills */}
        <div>
          <label className="block mb-2 font-medium text-sm">Minimum education</label>
          <div className="flex flex-wrap gap-2">
            {educationOptions.map((option) => (
              <Chip
                key={option}
                label={option}
                onClick={() => handleEducationToggle(option)}
                color={education.includes(option) ? 'primary' : 'default'}
                variant={education.includes(option) ? 'filled' : 'outlined'}
              />
            ))}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center gap-4">
          <Controller
            name="activeIn"
            control={control}
            render={({ field }) => (
              <TextField {...field} select size="small" className="w-40" label="Active in">
                <MenuItem value="1">1 month</MenuItem>
                <MenuItem value="3">3 months</MenuItem>
                <MenuItem value="6">6 months</MenuItem>
                <MenuItem value="12">1 year</MenuItem>
              </TextField>
            )}
          />

          <Button
            type="button"
            variant="outlined"
            color="secondary"
            onClick={() => reset()}
            startIcon={<RefreshCcw size={18} />}
          >
            Reset
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="success"
            startIcon={<Search size={18} />}
          >
            Search candidates
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchCandidatesForm;
