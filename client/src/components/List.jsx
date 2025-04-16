import React from 'react'
import { Divider, Menu } from '@mantine/core'
import { EllipsisVertical , Trash } from 'lucide-react'
function List({data}) {
  return (
    <div>
        {data.length > 0
                ? data.map((rh) => (
                    <>
                      <div className="flex items-center">
                        <Menu>
                          <Menu.Target>
                            <EllipsisVertical className="cursor-pointer" />
                          </Menu.Target>
                          <Menu.Dropdown>
                            <Menu.Item color="red" leftSection={<Trash />}>
                              Delete
                            </Menu.Item>
                          </Menu.Dropdown>
                        </Menu>

                        <a
                          href={rh.url}
                          className="block p-3 hover:underline transition-all duration-300"
                          target="_blank"
                        >
                          {rh.title}
                        </a>
                      </div>
                      <Divider />
                    </>
                  ))
                : null}
    </div>
  )
}

export default List
