import { createClient } from "../utils/supabase/server";
import { cookies } from "next/headers";

interface Event {
  id: string;
  title: string;
  description: string;
}

export default async function Page() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  // Get all communities from supabase
  const { data: communities } = await supabase.from("communities").select();

  // If communities is null, return an empty div
  if (!communities) {
    return <div>No communities found</div>;
  }

  // Get events for each community
  const communitiesWithEvents = await Promise.all(
    communities.map(async (community) => {
      const { data: events } = await supabase
        .from("events")
        .select()
        .eq("community_id", community.id);
      return { ...community, events };
    })
  );

  return (
    <div>
      {communitiesWithEvents.map((community) => (
        <div key={community.id}>
          <h2>{community.name}</h2>
          {community.events.map((event: Event) => (
            <div key={event.id}>
              <h3>{event.title}</h3>
              <p>{event.description}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
