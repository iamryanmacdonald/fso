import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

interface StarRatingProps {
  value: number;
}

const StarRating = (props: StarRatingProps) => {
  const { value } = props;
  return (
    <div>
      {value >= 1 ? <StarIcon /> : <StarOutlineIcon />}
      {value >= 2 ? <StarIcon /> : <StarOutlineIcon />}
      {value >= 3 ? <StarIcon /> : <StarOutlineIcon />}
    </div>
  );
};

export default StarRating;
