'use client';

import { useEffectEvent, useState, useEffect } from 'react';
import  Button  from '@/components/atoms/button/buttons';
import Input from '@/components/atoms/input/input';
import Textarea from '@/components/atoms/textarea/textarea';
import { Task } from '@/types/task';
import TaskItem from '@/components/molecules/TaskItem/TaskItem';
import FilterButton from '../components/molecules/Filterbutton/Filterbutton';
import TaskForm from '../components/organisms/TaskForm/TaskForm';
import TaskList from '../components/organisms/TaskList/TaskList';
import useTasks from '@/hooks/useTasks/useTasks';

  export default function DashboardPage() {

    const {   tasks,
    title,
    setTitle,
    description,
    setDescription,
    filter,
    setFilter,
    editingTask,
    seteditingTask,
    error,
    handleCreate,
    onEdit,
    deleteTask,
    editarTask,
    filteredTasks} = useTasks()

      return (
     <main className="mx-auto max-w-2xl px-4 py-10">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Mis tareas</h1>

      <TaskForm
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      editingTask={editingTask}
      seteditingTask={seteditingTask}
      handleCreate={handleCreate}
      error={error}
      />

      <FilterButton
      filter={filter}
      setfilter={setFilter}
      />

      <TaskList
      onEdit={onEdit}
      editarTask={editarTask}
      deleteTask={deleteTask}
      filteredTasks={filteredTasks}
      />
    </main>
    );
    }