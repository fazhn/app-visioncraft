<template>
  <div class="bg-white dark:bg-gray-800 rounded-xl p-4 sm:p-6 shadow-sm">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 sm:mb-6">
      <div class="min-w-0 flex-1">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white truncate">Historial de Retiros</h2>
        <p class="text-sm text-gray-500 dark:text-gray-400">Últimas transacciones realizadas</p>
      </div>
      <div class="flex items-center gap-2 flex-shrink-0">
        <UButton 
          icon="i-heroicons-arrow-path" 
          size="xs" 
          color="neutral" 
          variant="ghost"
          class="sm:size-sm"
          @click="refreshHistory"
          :loading="isRefreshing"
        />
        <UDropdown :items="filterMenuItems" :popper="{ placement: 'bottom-end' }">
          <UButton 
            icon="i-heroicons-funnel" 
            size="xs" 
            color="neutral" 
            variant="ghost"
            class="sm:size-sm"
          />
        </UDropdown>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredWithdrawals.length === 0" class="text-center py-8 sm:py-12 px-4">
      <div class="w-12 h-12 sm:w-16 sm:h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
        <UIcon name="i-heroicons-clock" class="text-xl sm:text-2xl text-gray-400" />
      </div>
      <h3 class="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-2">No hay retiros aún</h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4 sm:mb-6 max-w-sm mx-auto">Cuando realices tu primer retiro, aparecerá aquí</p>
      <UButton color="primary" size="sm" @click="handleCreateWithdrawal">
        Realizar primer retiro
      </UButton>
    </div>

    <!-- Withdrawals List -->
    <div v-else class="space-y-3 sm:space-y-4">
      <div 
        v-for="withdrawal in filteredWithdrawals" 
        :key="withdrawal.id"
        class="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
      >
        <!-- Mobile Layout: Stack on small screens -->
        <div class="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
          <!-- Status Icon -->
          <div class="flex-shrink-0">
            <div 
              class="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center"
              :class="{
                'bg-green-100 dark:bg-green-900/30': withdrawal.status === 'completed',
                'bg-yellow-100 dark:bg-yellow-900/30': withdrawal.status === 'pending',
                'bg-red-100 dark:bg-red-900/30': withdrawal.status === 'failed'
              }"
            >
              <UIcon 
                :name="getStatusIcon(withdrawal.status)"
                class="text-base sm:text-lg"
                :class="{
                  'text-green-600 dark:text-green-400': withdrawal.status === 'completed',
                  'text-yellow-600 dark:text-yellow-400': withdrawal.status === 'pending',
                  'text-red-600 dark:text-red-400': withdrawal.status === 'failed'
                }"
              />
            </div>
          </div>

          <!-- Transaction Details -->
          <div class="min-w-0 flex-1">
            <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
              <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                Retiro {{ withdrawal.type === 'binance' ? 'a Binance' : 'manual' }}
              </p>
              <UBadge 
                :color="getStatusColor(withdrawal.status)" 
                variant="soft" 
                size="xs"
                class="self-start sm:self-auto"
              >
                {{ getStatusText(withdrawal.status) }}
              </UBadge>
            </div>
            <p class="text-xs text-gray-500 dark:text-gray-400 mb-2">
              {{ formatDate(withdrawal.date) }}
            </p>
            
            <!-- Hash section - better mobile layout -->
            <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
              <div class="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                <span class="flex-shrink-0">Hash:</span>
                <code class="bg-gray-200 dark:bg-gray-600 px-2 py-0.5 rounded text-xs break-all sm:break-normal flex-1 sm:flex-initial">
                  {{ truncateHash(withdrawal.hash) }}
                </code>
                <UButton 
                  icon="i-heroicons-clipboard" 
                  size="xs" 
                  color="neutral" 
                  variant="ghost"
                  class="flex-shrink-0"
                  @click="copyHash(withdrawal.hash)"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Amount Section - Mobile: Full width, Desktop: Right aligned -->
        <div class="flex justify-between sm:justify-end items-center sm:flex-col sm:items-end sm:text-right flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-gray-200 dark:border-gray-600">
          <div class="sm:hidden">
            <span class="text-xs text-gray-500 dark:text-gray-400">Monto:</span>
          </div>
          <div>
            <p class="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
              -{{ formatCurrency(withdrawal.amount) }}
            </p>
            <p class="text-xs text-gray-500 dark:text-gray-400">
              USDC.e
            </p>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
interface Withdrawal {
  id: string;
  amount: number;
  date: Date;
  status: 'completed' | 'pending' | 'failed';
  hash: string;
  type: 'binance' | 'manual';
  address?: string;
}

const toast = useToast();

// Reactive data
const withdrawals = ref<Withdrawal[]>([
  {
    id: '1',
    amount: 150.50,
    date: new Date(2024, 2, 15, 14, 30),
    status: 'completed',
    hash: '0x8a7c9d4e5f6a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c',
    type: 'binance'
  },
  {
    id: '2',
    amount: 75.25,
    date: new Date(2024, 2, 12, 9, 15),
    status: 'completed',
    hash: '0x1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c',
    type: 'manual'
  },
  {
    id: '3',
    amount: 200.00,
    date: new Date(2024, 2, 10, 16, 45),
    status: 'pending',
    hash: '0x3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d',
    type: 'binance'
  },
  {
    id: '4',
    amount: 50.75,
    date: new Date(2024, 2, 8, 11, 20),
    status: 'failed',
    hash: '0x5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d5e6f',
    type: 'manual'
  }
]);

const currentFilter = ref<string>('all');
const isRefreshing = ref(false);

// Computed
const filteredWithdrawals = computed(() => {
  if (currentFilter.value === 'all') {
    return withdrawals.value;
  }
  return withdrawals.value.filter(w => w.status === currentFilter.value);
});

// Filter menu items
const filterMenuItems = [
  [{
    label: 'Todos',
    click: () => currentFilter.value = 'all'
  }],
  [{
    label: 'Completados',
    click: () => currentFilter.value = 'completed'
  }, {
    label: 'Pendientes',
    click: () => currentFilter.value = 'pending'
  }, {
    label: 'Fallidos',
    click: () => currentFilter.value = 'failed'
  }]
];

// Methods
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  }).format(amount);
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const truncateHash = (hash: string) => {
  return `${hash.slice(0, 6)}...${hash.slice(-4)}`;
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'completed':
      return 'i-heroicons-check-circle';
    case 'pending':
      return 'i-heroicons-clock';
    case 'failed':
      return 'i-heroicons-x-circle';
    default:
      return 'i-heroicons-question-mark-circle';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'success';
    case 'pending':
      return 'warning';
    case 'failed':
      return 'error';
    default:
      return 'neutral';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'completed':
      return 'Completado';
    case 'pending':
      return 'Pendiente';
    case 'failed':
      return 'Fallido';
    default:
      return 'Desconocido';
  }
};

const refreshHistory = async () => {
  isRefreshing.value = true;
  
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Add some new mock data
  const newWithdrawal: Withdrawal = {
    id: Date.now().toString(),
    amount: Math.random() * 200 + 50,
    date: new Date(),
    status: 'completed',
    hash: '0x' + Math.random().toString(16).substring(2).padEnd(64, '0'),
    type: Math.random() > 0.5 ? 'binance' : 'manual'
  };
  
  withdrawals.value.unshift(newWithdrawal);
  isRefreshing.value = false;
  
  toast.add({
    title: 'Historial actualizado',
    description: 'Se encontraron nuevas transacciones',
    color: 'success'
  });
};


const copyHash = async (hash: string) => {
  try {
    await navigator.clipboard.writeText(hash);
    toast.add({
      title: 'Hash copiado',
      description: 'Hash de transacción copiado al portapapeles',
      color: 'success'
    });
  } catch (err) {
    toast.add({
      title: 'Error al copiar',
      description: 'No se pudo copiar el hash',
      color: 'error'
    });
  }
};

const handleCreateWithdrawal = () => {
  toast.add({
    title: 'Crear retiro',
    description: 'Próximamente: función para crear nuevos retiros',
    color: 'info'
  });
};
</script>