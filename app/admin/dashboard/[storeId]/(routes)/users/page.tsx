
import { redirect } from "next/navigation";
import { checkRole } from "@/utils/roles";
import { SearchUsers } from "./_search-users";
import { clerkClient } from "@clerk/nextjs/server";
import { UserForm } from "./user";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Step On | Manage Users",
  description: "Step On Shoe Store Admin Dashboard Manage Users",
};

export default async function UsersPage(params: {
  searchParams: { search?: string};
  storeId : string;
}) {
  const query = params.searchParams.search;
  const users = query ? 
  (await clerkClient().users.getUserList({ query })).data : 
  (await clerkClient().users.getUserList({orderBy: '-created_at'})).data;

  return (
    <>
      <SearchUsers />
      <div className="lg:flex w-full">
      {users.map((user) => {
        return (
             <div key={user.id} className="lg:flex-row">
                <UserForm
                  id = {user.id}  
                  firstName =  {user.firstName}
                  lastName = {user.lastName}
                  email = {
                    user.emailAddresses.find(
                    (email) => email.id === user.primaryEmailAddressId
                    )?.emailAddress
                  }
                  role = { user.publicMetadata.role as string }
                  />
              </div>
        );
      })}
    </div>
    </>
  );
}