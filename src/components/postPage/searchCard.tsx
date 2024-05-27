import { SearchIcon } from "lucide-react";
import React from "react";
import H4 from "../typography/h4";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const SearchCard = () => {
  return (
    <Card>
      <CardHeader>
        <H4>Search</H4>
      </CardHeader>
      <CardContent>
        <form className="mt-4 flex">
          <Input
            className="flex-1"
            placeholder="Search news..."
            type="text"
          />
          <Button className="ml-2" type="submit" variant="outline">
            <SearchIcon className="h-5 w-5" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SearchCard;
