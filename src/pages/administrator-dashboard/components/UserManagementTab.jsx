import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const UserManagementTab = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const languages = {
    en: {
      userManagement: 'User Management',
      searchUsers: 'Search users...',
      addUser: 'Add User',
      bulkActions: 'Bulk Actions',
      allRoles: 'All Roles',
      salesperson: 'Salesperson',
      administrator: 'Administrator',
      allStatus: 'All Status',
      active: 'Active',
      inactive: 'Inactive',
      suspended: 'Suspended',
      name: 'Name',
      email: 'Email',
      role: 'Role',
      status: 'Status',
      lastLogin: 'Last Login',
      actions: 'Actions',
      edit: 'Edit',
      delete: 'Delete',
      activate: 'Activate',
      deactivate: 'Deactivate',
      selectAll: 'Select All'
    },
    es: {
      userManagement: 'Gestión de Usuarios',
      searchUsers: 'Buscar usuarios...',
      addUser: 'Agregar Usuario',
      bulkActions: 'Acciones Masivas',
      allRoles: 'Todos los Roles',
      salesperson: 'Vendedor',
      administrator: 'Administrador',
      allStatus: 'Todos los Estados',
      active: 'Activo',
      inactive: 'Inactivo',
      suspended: 'Suspendido',
      name: 'Nombre',
      email: 'Correo',
      role: 'Rol',
      status: 'Estado',
      lastLogin: 'Último Acceso',
      actions: 'Acciones',
      edit: 'Editar',
      delete: 'Eliminar',
      activate: 'Activar',
      deactivate: 'Desactivar',
      selectAll: 'Seleccionar Todo'
    }
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const usersData = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@company.com",
      role: "administrator",
      status: "active",
      lastLogin: "2024-01-15 09:30 AM",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150"
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "michael.chen@company.com",
      role: "salesperson",
      status: "active",
      lastLogin: "2024-01-15 08:45 AM",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.rodriguez@company.com",
      role: "salesperson",
      status: "inactive",
      lastLogin: "2024-01-12 02:15 PM",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150"
    },
    {
      id: 4,
      name: "David Thompson",
      email: "david.thompson@company.com",
      role: "administrator",
      status: "suspended",
      lastLogin: "2024-01-10 11:20 AM",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150"
    },
    {
      id: 5,
      name: "Lisa Wang",
      email: "lisa.wang@company.com",
      role: "salesperson",
      status: "active",
      lastLogin: "2024-01-15 07:30 AM",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-success-100 text-success-700';
      case 'inactive':
        return 'bg-secondary-100 text-secondary-700';
      case 'suspended':
        return 'bg-error-100 text-error-700';
      default:
        return 'bg-secondary-100 text-secondary-700';
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'administrator':
        return 'bg-primary-100 text-primary-700';
      case 'salesperson':
        return 'bg-accent-100 text-accent-700';
      default:
        return 'bg-secondary-100 text-secondary-700';
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(user => user.id));
    }
  };

  const filteredUsers = usersData.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const t = languages[currentLanguage];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl font-semibold text-text-primary font-heading">
          {t.userManagement}
        </h2>
        <Button variant="primary" iconName="Plus">
          {t.addUser}
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col lg:flex-row gap-4 p-4 bg-surface-secondary rounded-lg border border-border">
        <div className="flex-1">
          <Input
            type="search"
            placeholder={t.searchUsers}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">{t.allRoles}</option>
            <option value="administrator">{t.administrator}</option>
            <option value="salesperson">{t.salesperson}</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 border border-border rounded-md bg-surface text-text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="all">{t.allStatus}</option>
            <option value="active">{t.active}</option>
            <option value="inactive">{t.inactive}</option>
            <option value="suspended">{t.suspended}</option>
          </select>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="flex items-center gap-4 p-4 bg-primary-50 rounded-lg border border-primary-200">
          <span className="text-sm font-medium text-primary-700">
            {selectedUsers.length} users selected
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" iconName="UserCheck">
              {t.activate}
            </Button>
            <Button variant="outline" size="sm" iconName="UserX">
              {t.deactivate}
            </Button>
            <Button variant="danger" size="sm" iconName="Trash2">
              {t.delete}
            </Button>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="bg-surface rounded-lg border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-surface-secondary border-b border-border">
              <tr>
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={handleSelectAll}
                    className="rounded border-border text-primary focus:ring-primary"
                  />
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary font-caption">
                  {t.name}
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary font-caption">
                  {t.email}
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary font-caption">
                  {t.role}
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary font-caption">
                  {t.status}
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary font-caption">
                  {t.lastLogin}
                </th>
                <th className="px-4 py-3 text-left text-sm font-medium text-text-secondary font-caption">
                  {t.actions}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-surface-secondary transition-colors duration-200">
                  <td className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <span className="text-sm font-medium text-text-primary font-body">
                        {user.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-text-secondary font-body">
                    {user.email}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                      {t[user.role]}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                      {t[user.status]}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-text-secondary font-body">
                    {user.lastLogin}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-text-secondary hover:text-primary transition-colors duration-200">
                        <Icon name="Edit2" size={16} />
                      </button>
                      <button className="p-1 text-text-secondary hover:text-error transition-colors duration-200">
                        <Icon name="Trash2" size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserManagementTab;