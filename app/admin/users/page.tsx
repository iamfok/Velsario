'use client'

import { useState } from 'react'
import { Plus, ShieldCheck, Edit, Trash2 } from 'lucide-react'

const initialUsers = [
  {
    id: 1,
    name: 'Super Admin',
    email: 'admin@velsario.com',
    role: 'Super Admin',
    status: 'Active',
  },
]

const roles = [
  'Super Admin',
  'Manager Admin',
  'Content Admin',
]

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers)
  const [showForm, setShowForm] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('Content Admin')

  const addUser = () => {
    if (!name.trim() || !email.trim()) return

    setUsers([
      ...users,
      {
        id: Date.now(),
        name: name.trim(),
        email: email.trim(),
        role,
        status: 'Active',
      },
    ])

    setName('')
    setEmail('')
    setRole('Content Admin')
    setShowForm(false)
  }

  const deleteUser = (id: number) => {
    if (!confirm('Delete this admin user?')) return

    setUsers(users.filter((user) => user.id !== id))
  }

  return (
    <div>

      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">

        <div>
          <p className="text-xs tracking-widest uppercase text-v-gray mb-2">
            Security
          </p>

          <h1 className="text-2xl font-medium">
            Users & Access
          </h1>

          <p className="text-sm text-v-gray mt-1">
            Manage admin users and access levels.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={14} />
          Add User
        </button>

      </div>

      {/* ACCESS LEVELS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

        <div className="bg-white border border-v-border p-5">

          <ShieldCheck size={20} className="mb-4" />

          <h2 className="text-sm font-medium">
            Super Admin
          </h2>

          <p className="text-xs text-v-gray mt-2">
            Full access to all admin features and settings.
          </p>

        </div>

        <div className="bg-white border border-v-border p-5">

          <ShieldCheck size={20} className="mb-4" />

          <h2 className="text-sm font-medium">
            Manager Admin
          </h2>

          <p className="text-xs text-v-gray mt-2">
            Manage products, orders, customers and store operations.
          </p>

        </div>

        <div className="bg-white border border-v-border p-5">

          <ShieldCheck size={20} className="mb-4" />

          <h2 className="text-sm font-medium">
            Content Admin
          </h2>

          <p className="text-xs text-v-gray mt-2">
            Manage products, banners, pages and website content.
          </p>

        </div>

      </div>

      {/* ADD USER */}
      {showForm && (
        <div className="bg-white border border-v-border p-6 mb-6">

          <p className="text-xs tracking-widest uppercase mb-4">
            New Admin User
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className="border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="border border-v-border px-4 py-3 text-sm outline-none focus:border-black"
            />

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border border-v-border px-4 py-3 text-sm outline-none focus:border-black bg-white"
            >
              {roles.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

          </div>

          <div className="flex justify-end mt-4">

            <button
              onClick={addUser}
              className="bg-v-black text-white px-6 py-3 text-xs tracking-wider"
            >
              Add User
            </button>

          </div>

        </div>
      )}

      {/* USERS TABLE */}
      <div className="bg-white border border-v-border overflow-hidden">

        <div className="overflow-x-auto">

          <table className="w-full min-w-[800px]">

            <thead>

              <tr className="border-b border-v-border bg-v-light">

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  User
                </th>

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Role
                </th>

                <th className="text-left px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Status
                </th>

                <th className="text-right px-6 py-4 text-xs tracking-widest uppercase text-v-gray font-medium">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody className="divide-y divide-v-border">

              {users.map((user) => (

                <tr
                  key={user.id}
                  className="hover:bg-v-light transition-colors"
                >

                  <td className="px-6 py-4">

                    <p className="text-sm font-medium">
                      {user.name}
                    </p>

                    <p className="text-xs text-v-gray mt-1">
                      {user.email}
                    </p>

                  </td>

                  <td className="px-6 py-4">

                    <span className="text-xs px-3 py-1 bg-gray-100">
                      {user.role}
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    <span className="text-xs px-2 py-1 bg-green-50 text-green-600">
                      {user.status}
                    </span>

                  </td>

                  <td className="px-6 py-4">

                    <div className="flex items-center justify-end gap-2">

                      <button className="p-2 text-v-gray hover:text-v-black">
                        <Edit size={14} />
                      </button>

                      {user.role !== 'Super Admin' && (
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="p-2 text-v-gray hover:text-red-500"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  )
}
