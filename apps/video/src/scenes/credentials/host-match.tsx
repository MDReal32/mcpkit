import { COLORS } from "../../const";

interface HostMatchProps {
  host: string;
  query: string;
}

/** A saved host with the part that matches what was typed picked out. */
export const HostMatch = ({ host, query }: HostMatchProps) => {
  const start = host.indexOf(query);
  if (start < 0) {
    return <>{host}</>;
  }
  return (
    <>
      {host.slice(0, start)}
      <span style={{ color: COLORS.accentLight }}>{query}</span>
      {host.slice(start + query.length)}
    </>
  );
};
