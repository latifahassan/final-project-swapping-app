import React, { useEffect, useState } from "react";
import UploadItem from "../UploadItem/UploadItem";
import ListDisplay from "../ListDisplay/ListDisplay";
import { TableResults } from "../App/App";
import supabase from "../../supabaseClient";
import { User } from "@supabase/supabase-js";
import PopUp from "../PopUp/PopUp";

type MyAccountPageProps = {
  items: TableResults[];
  filteredItems: TableResults[];
  setFilteredItems: (items: TableResults[]) => void;
  tokenCount: number;
  setTokenCount: (tokenCount: number) => void;
  getItems: () => void;
  selectedItem: string[];
  setSelectedItem: (selectedItem: string[]) => void;
};

export default function MyAccountPage({
  items,
  filteredItems,
  setFilteredItems,
  tokenCount,
  setTokenCount,
  getItems,
  selectedItem,
  setSelectedItem,
}: MyAccountPageProps) {
  let numItems = 99;

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [claimantUsername, setClaimantUsername] = useState("");
  const [claimantAddress, setClaimantAddress] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  

  useEffect( () => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser()
      setCurrentUser(user);
    if(user) {
      setFilteredItems(items.filter(x => x.user_id === user?.id));
      setLoading(false);
    } else {
      console.error("User does not have a value.");
    };
    };
    getUser();
  }, [items, setFilteredItems] );


  useEffect(() => {
    console.log("see currently logged in user below...", currentUser);
  }, [currentUser]);

  async function fetchClaimantDetails(itemId: string) {
    const { data: claimsData, error: claimsError } = await supabase
      .from("claims")
      .select("user_id")
      .eq("item_id", itemId);

    if (claimsError) {
      console.error("Error fetching claims:", claimsError);
      return;
    }

    const claimantUserId = claimsData[0]?.user_id;
    if (!claimantUserId) {
      console.error("Claimant user ID not found");
      return;
    }

    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("username, address")
      .eq("user_id", claimantUserId);

    if (userError) {
      console.error("Error fetching claimant details:", userError);
      return;
    }

    const claimant = userData[0];
    if (!claimant) {
      console.error("Claimant details not found");
      return;
    }

    setClaimantUsername(claimant.username);
    setClaimantAddress(claimant.address);
    
  }

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className="accountContainer">
      <div className="uploadItem">
        <h2>Make a listing</h2>
        <UploadItem
          tokenCount={tokenCount}
          setTokenCount={setTokenCount}
          getItems={getItems}
        />
        <ListDisplay
          numItems={numItems}
          items={items}
          filteredItems={filteredItems}
          setFilteredItems={setFilteredItems}
          tokenCount={tokenCount}
          setTokenCount={setTokenCount}
          fetchClaimantDetails={fetchClaimantDetails}
        />
        {showPopup && (
          <PopUp
            claimantUsername={claimantUsername}
            claimantAddress={claimantAddress}
          />
        )}
      </div>
    </div>
  );
}
