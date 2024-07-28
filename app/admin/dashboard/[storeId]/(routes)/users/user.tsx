
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {removeRole, setRole } from "./_actions";
import { checkRole } from "@/utils/roles";

interface UserFormProps {
    id : string;
    firstName : string | null;
    lastName: string | null;
    email : string | undefined
    role : string | null;
}

export const UserForm: React.FC<UserFormProps> = ({
    id, 
    firstName,
    lastName,
    email,
    role
}) => {
    return ( 
        <div  className="m-5 block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-black dark:border-gray-700 dark:hover:opacity-75">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {firstName} {lastName}
            </h5>
            <div className="font-normal text-gray-700 dark:text-gray-400">
            {
                email
            }
            { role && 
                <Badge variant={'outline'} className="ml-2">{role as string}</Badge>
            }
            <br />
            {
                "Id : " + id
            }
            </div>
            {
                checkRole("admin") &&
                    role === 'moderator' &&
                    <div>
                        <form action={removeRole}>
                            <input type="hidden" value={id} name="id" />
                            <Button variant={'destructive'} className="my-2" type="submit">Remove Moderator</Button>
                        </form>
                    </div>
            }
            {
                checkRole("admin") &&
                role !== 'moderator' &&
                role !== 'admin' &&
                <div>
                    <form action={setRole}>
                        <input type="hidden" value={id} name="id" />
                        <Button variant={'outline'} className="my-2" type="submit">Make Moderator</Button>
                    </form>
                </div>
            }
        </div>
    );
}