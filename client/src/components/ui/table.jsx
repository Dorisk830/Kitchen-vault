import * as React from "react";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

const Table = React.forwardRef(({ className, ...props }, ref) => (
  <div className="relative w-full overflow-auto">
    <table
      ref={ref}
      className={cn("w-full caption-bottom text-sm", className)}
      {...props} />
  </div>
));
Table.displayName = "Table";

// PropTypes validation for Table
Table.propTypes = {
  className: PropTypes.string, // Validate className as a string
  children: PropTypes.node,     // Validate children as a React node
};

const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

// PropTypes validation for TableHeader
TableHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props} />
));
TableBody.displayName = "TableBody";

// PropTypes validation for TableBody
TableBody.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className)}
    {...props} />
));
TableFooter.displayName = "TableFooter";

// PropTypes validation for TableFooter
TableFooter.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props} />
));
TableRow.displayName = "TableRow";

// PropTypes validation for TableRow
TableRow.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props} />
));
TableHead.displayName = "TableHead";

// PropTypes validation for TableHead
TableHead.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props} />
));
TableCell.displayName = "TableCell";

// PropTypes validation for TableCell
TableCell.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-sm text-muted-foreground", className)}
    {...props} />
));
TableCaption.displayName = "TableCaption";

// PropTypes validation for TableCaption
TableCaption.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
