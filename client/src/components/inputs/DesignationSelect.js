import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
});

const parkDesignations = [
  'national park',
  'national historical park',
  'national monument',
  'national historic trail',
  'national historic area',
  'national historic site',
  'national battefield',
  'park',
  'national memorial',
  'national seashore',
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const DesignationSelect = ({ value, handleChange, handleChipDelete }) => {
  const classes = useStyles();

  return (
    <FormControl fullWidth size="small">
      <InputLabel id="designation-select-label" htmlFor="designation-label" l>
        Park Designations
      </InputLabel>
      <Select
        labelId="designation-select-label"
        id="designation-select"
        multiple
        value={value}
        onChange={handleChange}
        input={<Input id="designation-label" name="designation-label" />}
        renderValue={(selected) => (
          <div className={classes.chips}>
            {selected.map((value) => (
              <Chip
                key={value}
                label={value}
                onDelete={() => handleChipDelete(value)}
                className={classes.chip}
                onMouseDown={(event) => {
                  event.stopPropagation();
                }}
              />
            ))}
          </div>
        )}
        MenuProps={MenuProps}
      >
        {parkDesignations.map((park) => (
          <MenuItem key={park} value={park}>
            {park}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DesignationSelect;