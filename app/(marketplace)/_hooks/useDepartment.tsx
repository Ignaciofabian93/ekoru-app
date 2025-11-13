import { GET_DEPARTMENT_BY_ID } from "@/graphql/product/queries";
import { useQuery } from "@apollo/client";

interface Props {
  id: number;
  page: number;
  pageSize: number;
}

export default function useDepartment({ id, page, pageSize }: Props) {
  const { data, loading, error } = useQuery(GET_DEPARTMENT_BY_ID, {
    variables: {
      id,
      page,
      pageSize,
    },
    skip: !id,
    fetchPolicy: "cache-first",
    errorPolicy: "all",
    notifyOnNetworkStatusChange: true,
  });

  return {
    department: data?.getDepartment || null,
    loading,
    error,
  };
}
