import { useCallback } from "react";
import {
  createSearchParams,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

const getNum = (param, defaultValue) => {
  if (!param) return defaultValue;
  return parseInt(param);
};

const usePageMove = () => {
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();
  const location = useLocation();

  const page = getNum(queryParams.get("page"), 1);
  const size = getNum(queryParams.get("size"), 10);
  const basePath = location.pathname.split("?").slice(0, -1).join("/");
  const queryDefault = createSearchParams({ page, size }).toString();
  const moveToList = useCallback(
    ({ page, size }) => {
      let queryStr = "";
      if (page || size) {
        const pageNum = getNum(page, 1);
        const sizeNum = getNum(size, 10);
        queryStr = createSearchParams({
          page: pageNum,
          size: sizeNum,
        }).toString();
      } else {
        queryStr = queryDefault;
      }
      navigate({ pathname: `${basePath}`, search: queryStr });
    },
    [page, size, basePath]
  );
  return { moveToList, page, size };
};

export default usePageMove;
