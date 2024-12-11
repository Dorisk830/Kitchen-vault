import { cn } from "@/lib/utils";
import PropTypes from "prop-types"; 

function Skeleton({
  className,
  ...props
}) {
  return (
    <div className={cn("animate-pulse rounded-md bg-muted", className)} {...props} />
  );
}

// PropTypes validation
Skeleton.propTypes = {
  className: PropTypes.string, // Validate className as a string
  children: PropTypes.node,     // Validate children as a node
};

export { Skeleton };
