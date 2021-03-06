import { Disclosure } from "@headlessui/react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { userAllLists } from "../../config/config";
import { getSubscribedLists } from "../../store/lists";

import SubscriptionListTable from "../ManageSubscriptionsPage/SubscriptionListTable";

export default function SubscriptionList({ list, token }) {
  const dispatch = useDispatch();

  let { id, owner, description, name } = list;

  const handleUnsubscribe = () => {
    const url = `${userAllLists}${id}/unsubscribe`;
    let header = {
      Authorization: "Token " + token,
    };

    axios
      .patch(url, {}, { headers: header })
      .then((res) => {
        dispatch(getSubscribedLists(token));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Disclosure>
      {({ open }) => (
        <>
          <div className={`${open ? "shadow-md" : "border"
          } px-4 py-2 rounded-md my-4`}>
          <Disclosure.Button className="w-full text-left flex flex-row items-center justify-between py-2 z-0">
            <div>{name}</div>
            {open ? (
              <ion-icon name="chevron-up-outline" />
            ) : (
              <ion-icon name="chevron-down-outline" />
            )}
          </Disclosure.Button>
            <Disclosure.Panel className={`justify-between px-2 items-center`}>
              <div
                className="px-2 max-w-max bg-red-100 text-red-700 rounded-md hover:bg-red-700 hover:text-white cursor-pointer transition-color duration-150 ease-in-out"
                onClick={() => handleUnsubscribe()}>
                Unsubscribe
              </div>

              <div className="flex flex-col gap-2">
                <div>
                  <label
                    htmlFor="owner"
                    className="font-semibold font-sans tracking-wider">
                    Owner
                  </label>
                  <div className="border px-2 py-1 bg-body-gray rounded">
                    {owner.email}
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="font-sans font-semibold tracking-wider">
                    Description
                  </label>
                  <div className="border px-2 py-1 bg-body-gray rounded">
                    {description}
                  </div>
                </div>
              </div>
              <div className="border rounded-md my-4">
                <SubscriptionListTable token={token} id={id} />
              </div>
            </Disclosure.Panel>
          </div>
        </>
      )}
    </Disclosure>
  );
}
