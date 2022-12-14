import { useQuery } from "@tanstack/react-query";

const useRoleCheck = email => {
    const { data, isLoading } = useQuery({
        queryKey: ['user', email],
        queryFn: () => fetch(`https://wisdorage-server.vercel.app/user?email=${email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('wisdorage-token')}`
            }
        }).then(res => res.json())
    })

    return [data?.role, isLoading]
};

export default useRoleCheck;