import AddEvent from "@/components/add-events";
import { Toaster } from "@/components/ui/toaster";
import getCurrentUserId from "@/lib/globalUserContext";

function AddEventPage() {
  const userId = getCurrentUserId() as string;
  return (
    <>
      <div className="grid place-items-center">
        <AddEvent userId={userId} />
      </div>
      <Toaster />
    </>
  );
}

export default AddEventPage;
