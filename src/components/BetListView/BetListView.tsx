import { Text, TouchableOpacity } from 'react-native'
import { ActivityIndicator, DataTable } from 'react-native-paper';
import { GetAllBetsResult, GetAllBetsResultItem } from '../../api/bets';
import { mom } from '../../lib/moment';
import { useState } from 'react';
import { CenteringView } from '../CenteringView';

interface BetListViewProps {
  isLoading: boolean;
  bets: GetAllBetsResult;
  onBetPress: (item: GetAllBetsResultItem) => void;
}

export default function BetListView({ isLoading, bets, onBetPress }: BetListViewProps) {
  const [page, setPage] = useState(1);

  if (isLoading) return (
    <CenteringView>
      <ActivityIndicator />
    </CenteringView>
  )

  if (bets === null || bets?.results === null) return (
    <CenteringView>
      <Text>Impossible de retrouver vos paris</Text>
    </CenteringView>
  )

  const from = page * 4;
  const to = Math.min((page + 1) * 4, bets.results.length);

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Parieur</DataTable.Title>
        <DataTable.Title>Type</DataTable.Title>
        <DataTable.Title>Date</DataTable.Title>
        <DataTable.Title>Montant</DataTable.Title>
      </DataTable.Header>
      {
        bets.results.slice(from, to).map((item) => (
          <TouchableOpacity
            key={item.id}
            onPress={
              () => onBetPress(item)
            }
          >
            <DataTable.Row>
              <DataTable.Cell>
                <Text style={{ fontSize: 12 }}>
                  {item.player.name}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text style={{ fontSize: 12 }}>
                  {item.betType.label}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text style={{ fontSize: 12 }}>
                  {mom(item.createdAt).format("DD/MM/YY")}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell>
                <Text style={{ fontSize: 12 }}>
                  {`${item.betType.price} FCFA`}
                </Text>
              </DataTable.Cell>
            </DataTable.Row>
          </TouchableOpacity>
        ))
      }
      <DataTable.Pagination
        style={{
          justifyContent: "space-between"
        }}
        page={page}
        numberOfPages={Math.ceil(bets?.results.length / 4)}
        onPageChange={(page) => { setPage(page) }}
        label={`${from + 1}-${to} of ${bets?.results.length}`}
        numberOfItemsPerPageList={[4]}
        numberOfItemsPerPage={4}
        onItemsPerPageChange={() => { }}
        showFastPaginationControls
        selectPageDropdownLabel={'Rows per page'}
      />
    </DataTable>
  );
}
